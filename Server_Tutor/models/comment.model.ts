import { Schema, model, Document, Model } from "mongoose";
import { User } from "./user.model";

// Định nghĩa interface cho Comment
export interface IComment extends Document {
  user: User;
  desc: string;
  courseId: string;
  lectureId: string;
  block: boolean;
  parent?: string;
  replyOnUser?: string;
}

// Định nghĩa schema cho Comment
const CommentSchema = new Schema<IComment>(
  {
    user: Object,
    desc: { type: String, required: true },
    courseId: String,
    lectureId: String,
    block: { type: Boolean, default: false },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    replyOnUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);
CommentSchema.virtual("replies", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parent",
});

const Comment: Model<IComment> = model<IComment>("Comment", CommentSchema);
export default Comment;
