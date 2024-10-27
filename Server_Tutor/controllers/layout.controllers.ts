import { NextFunction, Request, Response } from "express";
import { CathAsynsError } from "../middleware/catchAsynsError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import LayoutModel from "../models/layout.model";

export const createLayout = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (type === "Banner") {
        const { imageBanner, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(imageBanner, {
          folder: "Layout",
        });
        const banner = {
          imageBanner: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };
        await LayoutModel.create({ type, banner });
      } else if (type === "Faq") {
        const { faq } = req.body;
        const faqItems = faq.map(
          (item: { question: string; answer: string }) => ({
            question: item.question,
            answer: item.answer,
          })
        );
        await LayoutModel.create({ type, faq: faqItems });
      } else if (type === "Category") {
        const { categories } = req.body;
        const categoryItems = categories.map((item: { title: string }) => ({
          title: item.title,
        }));
        await LayoutModel.create({ type, categories: categoryItems });
      } else {
        return next(new ErrorHandler("Bạn chưa xác định loại layout", 400));
      }

      res.status(201).json({
        success: true,
        message: "Tạo layout thành công",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Edit layout for admin

export const editLayout = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (type === "Banner") {
        const bannerData: any = await LayoutModel.findOne({ type: "Banner" })

        const { imageBanner, title, subTitle } = req.body;

        const myCloud = await cloudinary.v2.uploader.upload(imageBanner, {
          folder: "Layout",
        });
        let banner = {};
        if (imageBanner) {
          await cloudinary.v2.uploader.destroy(
            bannerData?.banner?.imageBanner?.public_id
          );
          banner = {
            imageBanner: {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            },
            title,
            subTitle,
          };
        } else {
          await cloudinary.v2.uploader.destroy(
            bannerData?.banner?.imageBanner?.public_id
          );
          banner = {
            imageBanner: {
              public_id: bannerData.imageBanner.public_id,
              url: bannerData.imageBanner.secure_url,
            },
            title,
            subTitle,
          };
        }
        

        await LayoutModel.findByIdAndUpdate(bannerData._id, { type, banner });
      } else if (type === "Faq") {
        const { faq } = req.body;
        const faqData: any = await LayoutModel.findOne({ type: "Faq" });
        const faqItems = faq.map(
          (item: { question: string; answer: string }) => ({
            question: item.question,
            answer: item.answer,
          })
        );
        await LayoutModel.findByIdAndUpdate(faqData._id, {
          type,
          faq: faqItems,
        });
      } else if (type === "Category") {
        const { categories } = req.body;
        const categoryData: any = await LayoutModel.findOne({
          type: "Category",
        });
        const categoryItems = categories.map((item: { title: string }) => ({
          title: item.title,
        }));
        await LayoutModel.findByIdAndUpdate(categoryData._id, {
          type,
          categories: categoryItems,
        });
      } else {
        return next(new ErrorHandler("Bạn chưa xác định loại layout", 400));
      }

      res.status(201).json({
        success: true,
        message: "Cập nhật layout thành công",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get Layout By Type

export const getLayoutByType = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.params;
    const layout = await LayoutModel.findOne({ type });
    if (!layout) {
      return res.status(404).json({
        success: false,
        message: "Layout not found",
      });
    }
    res.status(201).json({
      success: true,
      layout,
    });
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
