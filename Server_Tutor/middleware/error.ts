import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
require("dotenv").config();

export const ErrorMiddlerware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Không tìm thấy sever";

  if (err.name === "CastError") {
    const message = `Yêu cầu bị lỗi ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `Duplicate  ${Object.keys(err.path)} entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonwebTokenError") {
    const message = `JsonWebToken khong tim thay`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `TokenExpiredError khong tim thay`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
