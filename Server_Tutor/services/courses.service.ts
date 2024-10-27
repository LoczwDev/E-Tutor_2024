import { Response } from "express";
import { CathAsynsError } from "../middleware/catchAsynsError";
import CourseModel from "../models/courses.model";

export const createCourses = CathAsynsError(
  async (data: any, res: Response) => {
    const courses = await CourseModel.create(data);
    res.status(201).json({
      success: true,
      courses,
    });
  }
);

export const getAllCoursesService = async (res: Response) => {
  const courses = await CourseModel.find({});
  res.status(201).json({
    success: true,
    courses,
  });
};
