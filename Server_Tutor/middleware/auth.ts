import { NextFunction, Request, Response } from "express";
import { CathAsynsError } from "./catchAsynsError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";

require("dotenv").config();

export const isAutheticated = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;
    
    
    if (!access_token) {
      return next(
        new ErrorHandler(
          "Bạn vui lòng đăng nhập để có thể sử dụng chức năng này",
          400
        )
      );
    }

    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;


    if (!decoded) {
      return next(new ErrorHandler("Không tồn tại access_token", 400));
    }
    const user = await redis.get(decoded.id);

    if (!user) {
      return next(new ErrorHandler("Không tồn tại user tại redis", 400));
    }

    req.user = JSON.parse(user);

    next();
  }
);

export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.user?.role || "")) {
        return next(
          new ErrorHandler(
            `Role:${req.user?.role} không có quyền đăng nhập vào trang này`,
            403
          )
        );
      }
      next();
    };
  };
