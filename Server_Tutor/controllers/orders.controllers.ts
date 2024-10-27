import { NextFunction, Request, Response } from "express";
import { CathAsynsError } from "../middleware/catchAsynsError";
import UserModel from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import CourseModel from "../models/courses.model";
import { getAllOrdersService, newOrder } from "../services/orders.service";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendEmail";
import NotificationModel from "../models/notification.model";
import { redis } from "../utils/redis";
import OrderModel from "../models/orders.model";

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY || "");

interface Order extends Document {
  courseId: string;
  userId: string;
  payment_info: object;
  emailOrder: string;
}

// export const createOrder = CathAsynsError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { courseId, payment_info, emailOrder } = req.body as Order;
//       const user = await UserModel.findById(req.user?._id);

//       if (payment_info) {
//         if ("id" in payment_info) {
//           const paymentIntentId = payment_info.id;
//           const paymentIntent = await stripe.paymentIntents.retrieve(
//             paymentIntentId
//           );
//           if (paymentIntent.status !== "succeeded") {
//             return next(new ErrorHandler("Khong tim thay authorized", 400));
//           }
//         }
//       }

//       if (!user) {
//         return next(new ErrorHandler("Không tìm thấy tài khoản", 404));
//       }

//       const courseExistInUser = user.progress.some((item: any) => {
//         return item.courseId && item.courseId.toString() === courseId;
//       });

//       if (courseExistInUser) {
//         return next(new ErrorHandler("Bạn đã mua khóa học này", 400));
//       }

//       const course: any = await CourseModel.findById(courseId);
//       if (!course) {
//         return next(new ErrorHandler("Không tìm thấy khóa học", 404));
//       }

//       const data: any = {
//         course: course,
//         userId: user._id,
//         payment_info,
//         emailOrder: emailOrder,
//       };
//       const fullNameUser: any = user?.fullName
//         ? user?.fullName
//         : user?.lastName;

//       const mailData = {
//         order: {
//           _id: course._id,
//           name: course.name,
//           thumbnail: course.thumbnail.url,
//           nameTutor: course.tutor.fullName,
//           lastNameStudent: user?.lastName,
//           nameStudent: fullNameUser,
//           price:
//             course.estimatedPrice != 0 ? course.estimatedPrice : course.price,
//           date: new Date().toLocaleDateString("vi-VN", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//         },
//       };

//       // Render email template
//       const html = await ejs.renderFile(
//         path.join(__dirname, "../mails/orderComfirm.ejs"),
//         mailData
//       );

//       // Send confirmation email
//       try {
//         if (user) {
//           await sendMail({
//             email: emailOrder,
//             subject: "Bạn có đơn hàng mới từ E-tutor",
//             template: "orderComfirm.ejs",
//             data: mailData,
//           });
//         }
//       } catch (error: any) {
//         return next(new ErrorHandler(error.message, 500));
//       }
//       const currentLecture = course.curriculumData[0].lectures[0]._id;

//       if (!course) {
//         return next(new ErrorHandler("Không tìm thấy mã khóa học", 400));
//       } else {
//         user.progress.push({
//           courseId: courseId,
//           startCourse: false, // hoặc true nếu khóa học đã bắt đầu
//           endCourse: false, // hoặc true nếu khóa học đã hoàn thành
//           completedLectures: [],
//           currentLecture: currentLecture.toString(),
//           percentNumber: 0,
//           lectureNote: [], // hoặc thêm các ghi chú bài giảng nếu có
//         });
//       }

//       const userId = req.user?._id as string;
//       await redis.set(userId, JSON.stringify(user));

//       await user?.save();

//       // Create notification
//       await NotificationModel.findOneAndUpdate(
//         { receiverId: course.tutor._id },
//         {
//           $push: {
//             notification: {
//               creatorId: userId,
//               title: "Thanh toán mới",
//               message: `Bạn có một đơn hàng mới từ ${course.name}`,
//               status: "Chưa đọc",
//             },
//           },
//         },
//         { upsert: true, new: true }
//       );

//       course.purchased = (course.purchased || 0) + 1;
//       course.students.push(req.user);

//       await redis.set(courseId, JSON.stringify(course), "EX", 604800);

//       await course?.save();

//       newOrder(data, res, next);
//     } catch (error: any) {
//       next(new ErrorHandler(error.message, 500));
//     }
//   }
// );

export const createOrder = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseIds, payment_info, emailOrder, amount } = req.body as {
        courseIds: string[];
        payment_info: any;
        emailOrder: string;
        amount: string;
      };
      const user = await UserModel.findById(req.user?._id);

      if (!user) {
        return next(new ErrorHandler("Không tìm thấy tài khoản", 404));
      }

      if (payment_info) {
        if ("id" in payment_info) {
          const paymentIntentId = payment_info.id;
          const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
          );
          if (paymentIntent.status !== "succeeded") {
            return next(new ErrorHandler("Không tìm thấy authorized", 400));
          }
        }
      }

      const fullNameUser: any = user?.fullName
        ? user?.fullName
        : user?.lastName;

      const courses = [];
      const mailOrders: any = {
        lastNameStudent: user?.lastName,
        nameStudent: fullNameUser,
        emailStudent: emailOrder,
        amount: amount,
        dataCourses: [],
        date: new Date().toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };

      for (const courseId of courseIds) {
        // Kiểm tra nếu khóa học đã tồn tại trong progress của người dùng
        const courseExistInUser = user.progress.some((item: any) => {
          return item.courseId && item.courseId.toString() === courseId;
        });

        if (courseExistInUser) {
          return next(
            new ErrorHandler(`Bạn đã mua khóa học với ID ${courseId}`, 400)
          );
        }

        // Tìm khóa học
        const course: any = await CourseModel.findById(courseId);
        if (!course) {
          return next(
            new ErrorHandler(`Không tìm thấy khóa học với ID ${courseId}`, 404)
          );
        }

        // Thêm vào danh sách khóa học để lưu vào order
        courses.push(course);
        console.log("pushCourse");

        // Tạo dữ liệu email cho từng khóa học
        mailOrders?.dataCourses.push({
          _id: course._id,
          name: course.name,
          thumbnail: course.thumbnail.url,
          nameTutor: course.tutor.fullName,
          price:
            course.estimatedPrice != 0 ? course.estimatedPrice : course.price,
          date: new Date().toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        });

        const currentLecture = course.curriculumData[0].lectures[0]._id;

        // Cập nhật progress của user cho khóa học
        user.progress.push({
          courseId: courseId,
          startCourse: false,
          endCourse: false,
          completedLectures: [],
          currentLecture: currentLecture.toString(),
          percentNumber: 0,
          lectureNote: [],
        });

        const userId = req.user?._id as string;
        await redis.set(userId, JSON.stringify(user));
        await user?.save();

        course.purchased = (course.purchased || 0) + 1;
        course.students.push(req.user);

        await redis.set(courseId, JSON.stringify(course), "EX", 604800);
        await course.save();
      }

      // Render email template cho tất cả các khóa học
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/orderComfirm.ejs"),
        { orders: mailOrders }
      );

      // Gửi email xác nhận
      try {
        if (user) {
          await sendMail({
            email: emailOrder,
            subject: "Bạn có đơn hàng mới từ E-tutor",
            template: "orderComfirm.ejs",
            data: { orders: mailOrders },
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      await redis.set(req.user?._id as string, JSON.stringify(user));
      await user.save();

      // Lưu thông tin đơn hàng
      const order: any = {
        courses,
        userId: user._id,
        payment_info,
        emailOrder,
      };

      // Tạo thông báo cho từng tutor của mỗi khóa học
      for (const course of courses) {
        await NotificationModel.findOneAndUpdate(
          { receiverId: course.tutor._id },
          {
            $push: {
              notification: {
                creatorId: req.user?._id,
                title: "Thanh toán mới",
                message: `Bạn có một đơn hàng mới từ ${course.name}`,
                status: "Chưa đọc",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            },
          },
          { upsert: true, new: true }
        );
      }

      newOrder(order, res, next);
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);

// getAll Admin

export const getAllOrdersByAdmin = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const sendStripePublishableKey = CathAsynsError(
  async (req: Request, res: Response) => {
    res.status(200).json({
      publishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);

export const newPayment = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { amount } = req.body;
      console.log(amount);

      // Validate the minimum amount (at least 1,000 VND)
      if (amount < 12000) {
        return next(new ErrorHandler("Amount must be at least ₫12,000.", 400));
      }

      const myPayment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        metadata: {
          company: "E-tutor",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.status(201).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// export const newPayment = CathAsynsError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { products } = req.body;

//       const listItems = products.map((item: any) => ({
//         price_data: {
//           currency: "VND",
//           product_data: {
//             name: item.name,
//             images: [item.thumbnail.url],
//           },
//           unit_amount: Math.round(item.estimatedPrice),
//         },
//         quantity: 1,
//       }));

//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: listItems,
//         mode: "payment",
//         success_url: "http://localhost:3000/course/67024ff88f3461745d400f2a",
//         cancel_url: "http://localhost:3000/course/67024ff88f3461745d400f2a",
//       });
//       res.json({ id: session.id });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   }
// );

export const getOrderByUser = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;

      const orders = await OrderModel.find({ userId: userId });

      if (!orders || orders.length === 0) {
        return next(new ErrorHandler("Bạn chưa có đơn thanh toán nào", 404));
      }

      // Return the orders as a response
      res.status(200).json({
        success: true,
        orders: orders,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
