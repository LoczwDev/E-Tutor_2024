import { NextFunction, Request, Response } from "express";
import { CathAsynsError } from "../middleware/catchAsynsError";
import CommentModel from "../models/comment.model";
import ErrorHandler from "../utils/ErrorHandler";
import CourseModel from "../models/courses.model";
import NotificationModel from "../models/notification.model";

export const createComment = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { desc, courseId, lectureId, parent, replyOnUser } = req.body;
      const course: any = await CourseModel.findById(courseId);

      if (!course) {
        next(new ErrorHandler("Không tìm khóa học", 500));
      }
      if (parent) {
        const isCheckComment = await CommentModel.findById(parent);
        if (!isCheckComment) {
          next(new ErrorHandler("Không tìm thấy bình luận", 500));
        }
      }
      const lecture = course.curriculumData
        .flatMap((item: any) => item.lectures)
        .find((el: any) => el._id.toString() === lectureId);

      const titleLecture = lecture?.title;
      const newComment = {
        user: req.user,
        desc,
        parent,
        lectureId,
        courseId,
        replyOnUser,
      };

      let isCheckUser = false;
      if (replyOnUser) {
        isCheckUser = replyOnUser.toString() === req.user?._id;
      }

      const isCheckTutor: any = course.tutor?._id.toString() === req.user?._id;

      if (!isCheckTutor) {
        if (isCheckUser) {
          await NotificationModel.findOneAndUpdate(
            { receiverId: replyOnUser },
            {
              $push: {
                notification: {
                  creatorId: req.user?._id,
                  title: `${req.user?.fullName} đã trả lời`,
                  message: `Bạn có một câu trả lời  mới từ ${titleLecture}`,
                  status: "Chưa đọc",
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                },
              },
            },
            { upsert: true, new: true }
          );
        } else {
          await NotificationModel.findOneAndUpdate(
            { receiverId: course.tutor._id },
            {
              $push: {
                notification: {
                  creatorId: req.user?._id,
                  title: "Bình luận mới",
                  message: `Bạn có một bình luận mới từ khóa học: ${course.name}`,
                  status: "Chưa đọc",
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                },
              },
            },
            { upsert: true, new: true }
          );
        }
      }

      // Lưu bình luận mới

      const comment = await CommentModel.create(newComment);

      res.status(201).json({
        success: true,
        comment,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getCommentByLecture = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lectureId } = req.params;
      const comment = await CommentModel.find({
        lectureId: lectureId,
      }).populate("replies");

      res.status(200).json({
        success: true,
        comment,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const updateComment = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { desc } = req.body;

      const comment = await CommentModel.findById(req.params.commentId);

      if (!comment) {
        const error = new Error("Khong tim thay Comment");
        return next(error);
      }
      comment.desc = desc || comment.desc;
      const update = await comment.save();

      res.status(200).json({
        success: true,
        update,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const deleteComment = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comment: any = await CommentModel.findByIdAndDelete(
        req.params.commentId
      );
      await CommentModel.deleteMany({ parent: comment._id });

      if (!comment) {
        const error = new Error("Khong tim thay Comment");
        return next(new ErrorHandler(error.message, 500));
      }

      return res.json({
        message: "Comment đã được xóa",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
