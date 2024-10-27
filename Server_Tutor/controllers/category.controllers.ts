import { NextFunction, Request, Response } from "express";
import { CathAsynsError } from "../middleware/catchAsynsError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import CategoryModel from "../models/category.model";

export const createCategory = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { dataCategory } = req.body;

      if (dataCategory.imgCategory) {
        const imgCategoryUpdate = await cloudinary.v2.uploader.upload(
          dataCategory.imgCategory,
          {
            folder: "category",
          }
        );
        console.log(imgCategoryUpdate);
        
        dataCategory.imgCategory = {
          public_id: imgCategoryUpdate.public_id,
          url: imgCategoryUpdate.secure_url,
        };
      }

      const category = await CategoryModel.create(dataCategory);

      res.status(201).json({
        success: true,
        category,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const editCategory = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { categoryId } = req.params;
      const { dataCategory } = req.body;
      const { imgCategory } = dataCategory;

      // Tìm danh mục theo ID
      const category = await CategoryModel.findById(categoryId);
      if (!category) {
        return next(new ErrorHandler("Không tìm thấy danh mục", 404));
      }

      // Nếu có hình ảnh mới, upload lên Cloudinary
      if (
        imgCategory &&
        typeof imgCategory === "string" &&
        !imgCategory.startsWith("https")
      ) {
        // Xóa hình ảnh cũ trên Cloudinary nếu cần
        await cloudinary.v2.uploader.destroy(category.imgCategory.public_id);

        const imgCategoryUpdate = await cloudinary.v2.uploader.upload(
          dataCategory.imgCategory,
          {
            folder: "category",
          }
        );

        dataCategory.imgCategory = {
          public_id: imgCategoryUpdate.public_id,
          url: imgCategoryUpdate.secure_url,
        };
      }
      if (
        imgCategory &&
        typeof imgCategory === "string" &&
        imgCategory.startsWith("https")
      ) {
        dataCategory.imgCategory = {
          public_id: category.imgCategory.public_id,
          url: category.imgCategory.url,
        };
      }
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        categoryId,
        dataCategory,
        { new: true }
      );

      res.status(200).json({
        success: true,
        updatedCategory,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const deleteCategory = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { categoryId } = req.params; // Lấy id từ params

      // Tìm danh mục theo ID
      const category = await CategoryModel.findById(categoryId);
      if (!category) {
        return next(new ErrorHandler("Không tìm thấy danh mục", 404));
      }

      // Xóa hình ảnh khỏi Cloudinary
      await cloudinary.v2.uploader.destroy(category.imgCategory.public_id);

      // Xóa danh mục khỏi cơ sở dữ liệu
      await CategoryModel.findByIdAndDelete(categoryId);

      res.status(200).json({
        success: true,
        message: "Xóa danh mục thành công",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getSingleCategory = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { categoryId } = req.params;
      const category = await CategoryModel.findById(categoryId);

      res.status(200).json({
        success: true,
        category,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getAllCategory = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await CategoryModel.find();

      res.status(200).json({
        success: true,
        category,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
