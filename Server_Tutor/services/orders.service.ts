import { NextFunction, Response } from "express";
import { CathAsynsError } from "../middleware/catchAsynsError";
import OrderModel from "../models/orders.model";

export const newOrder = CathAsynsError(async (data: any, res: Response) => {
  const order = await OrderModel.create(data);
  res.status(201).json({
    success: true,
    order,
  });
});

export const getAllOrdersService = async (res: Response) => {
  const orders = await OrderModel.find({});
  res.status(201).json({
    success: true,
    orders,
  });
};
