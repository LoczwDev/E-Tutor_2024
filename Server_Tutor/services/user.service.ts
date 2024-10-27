import { Response } from "express";
import userModel from "../models/user.model";
import { redis } from "../utils/redis";

export const getUserById = async (id: string, res: Response) => {
  const userRedis = await redis.get(id);
  
  if (userRedis) {
    const user = JSON.parse(userRedis);
    res.status(201).json({
      success: true,
      user,
    });
  }
};

export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find({});
  res.status(201).json({
    success: true,
    users,
  });
};
export const changeRoleUserService = async (
  res: Response,
  id: String,
  role: String
) => {
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });

  // user?.role ? (user.role = "admin") : user?.role;
  // user?.save();
  res.status(201).json({
    success: true,
    user,
  });
};
