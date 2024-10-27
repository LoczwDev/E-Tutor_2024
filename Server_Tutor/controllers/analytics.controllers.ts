// get user-analytics for admin

import { NextFunction, Request, Response } from "express";
import { CathAsynsError } from "../middleware/catchAsynsError";
import ErrorHandler from "../utils/ErrorHandler";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import CourseModel from "../models/courses.model";
import OrderModel from "../models/orders.model";
import userModel from "../models/user.model";
import CategoryModel from "../models/category.model";

// anatytics --- by Admin ---totalOverview

export const getOverviewAnalytics = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const totalUsers = await userModel.countDocuments();

      const totalCourses = await CourseModel.countDocuments();
      const orders = await OrderModel.find();
      const totalAmount = orders.reduce((acc: any, order: any) => {
        const amount = order.payment_info?.amount || 0;
        return acc + amount;
      }, 0);

      const totalOrderValue = await OrderModel.countDocuments();

      const totalCategories = await CategoryModel.countDocuments();

      const totalSubCategoriesResult = await CategoryModel.aggregate([
        {
          $group: {
            _id: null,
            totalSubCategories: { $sum: { $size: "$subCategory" } },
          },
        },
      ]);

      const totalSubCategories =
        totalSubCategoriesResult[0]?.totalSubCategories || 0;

      const coursesCountByCategory = await CourseModel.aggregate([
        {
          $group: {
            _id: "$category",
            value: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            value: 1,
          },
        },
      ]);
      const courses = await CourseModel.find();
      const totalPaymentsByCategory = courses.reduce(
        (acc: any, course: any) => {
          const total: any = course.purchased * course.estimatedPrice;
          if (!acc[course.category]) {
            acc[course.category] = 0;
          }
          acc[course.category] += total;
          return acc;
        },
        {}
      );

      res.status(200).json({
        success: true,
        data: {
          totalUsers,
          totalCourses,
          totalOrderValue: totalOrderValue,
          totalAmount,
          totalCategories,
          totalSubCategories,
          countCoursesByCategory: coursesCountByCategory,
          totalPaymentsByCategory,
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Users analytics -- by Admin
export const getUsersAnalytics = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthsData(userModel);

      res.status(201).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
// Courses analytics -- by Admin
export const getCoursesAnalytics = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await generateLast12MonthsData(CourseModel);

      res.status(201).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
// Orders analytics -- by Admin
export const getOrdersAnalytics = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await generateLast12MonthsData(OrderModel);

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
