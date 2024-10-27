import mongoose, { Document, Model, Schema } from "mongoose";

export interface ContentNotification extends Document {
  creatorId: string;
  title: string;
  message: string;
  status: string;
}

export interface Notification extends Document {
  receiverId: string;
  notification: ContentNotification[];
}
const contentNotificationSchema = new Schema(
  {
    creatorId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    _id: true,
  }
);

const notificationSchema = new Schema(
  {
    receiverId: { type: String, required: true },
    notification: [contentNotificationSchema],
  },
  { timestamps: true }
);

const NotificationModel: Model<Notification> = mongoose.model<Notification>(
  "Notification",
  notificationSchema
);

export default NotificationModel;
