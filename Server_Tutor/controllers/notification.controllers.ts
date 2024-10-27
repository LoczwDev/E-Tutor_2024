import { NextFunction, Request, Response } from "express";
import { CathAsynsError } from "../middleware/catchAsynsError";
import ErrorHandler from "../utils/ErrorHandler";
import NotificationModel from "../models/notification.model";
import cron from "node-cron";

// getALL
export const getAllNotification = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    const notifications = await NotificationModel.find({}).sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      notifications,
    });
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
export const getNotificationByUser = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const notifications = await NotificationModel.findOne({
      receiverId: userId,
    }).sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      notifications,
    });
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
// UpdateStatus
export const updateNotification = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Lấy ID người dùng từ request
      const userId = req.user?._id as string;
      const { notificationId } = req.params;

      // Tìm thông báo theo receiverId
      const notification = await NotificationModel.findOne({
        receiverId: userId,
      });

      if (!notification) {
        return next(
          new ErrorHandler("Không tìm thấy thông báo thích hợp", 400)
        );
      }

      // Tìm thông báo cụ thể trong mảng notification
      const notificationToUpdate = notification.notification.find(
        (n: any) => n._id.toString() === notificationId
      );

      if (notificationToUpdate) {
        // Cập nhật trạng thái cho thông báo
        notificationToUpdate.status = "Đã đọc"; // Cập nhật trạng thái
      } else {
        return next(
          new ErrorHandler("Không tìm thấy thông báo trong danh sách", 400)
        );
      }

      await notification.save(); // Lưu thay đổi

      // Lấy danh sách tất cả thông báo cho người dùng sau khi cập nhật
      const notifications = await NotificationModel.find({
        receiverId: userId,
      }).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// delete notification

cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await NotificationModel.deleteMany({
    status: "Đã đọc",
    createdAt: { $lt: thirtyDaysAgo },
  });
  console.log("Đã xóa thông báo");
});
