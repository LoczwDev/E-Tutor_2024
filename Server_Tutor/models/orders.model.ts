import mongoose, { Document, Model, Schema } from "mongoose";
import { Course } from "./courses.model";

export interface Order extends Document {
  courses: Course[];
  userId: string;
  payment_info: object;
  emailOrder: string;
}

const orderSchema = new mongoose.Schema<Order>(
  {
    courses: [Object],
    userId: {
      type: String,
      required: true,
    },
    payment_info: {
      type: Object,
      // required: true,
    },
    emailOrder: {
      type: String,
    },
  },
  { timestamps: true }
);

const OrderModel: Model<Order> = mongoose.model("Order", orderSchema);
export default OrderModel;
