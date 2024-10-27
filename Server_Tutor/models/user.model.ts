import bcrypt from "bcryptjs";
import mongoose, { Document, Model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
require("dotenv").config();

const regexEmail: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

export interface ContentNote extends Document {
  titleLecture: string;
  timeNoteLecture: string;
  textNote: string;
}

export interface LectureNote extends Document {
  lectureId: string;
  contentNote: ContentNote[];
}

export interface User extends Document {
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone: string;
  title: string;
  password: string;
  introduction: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: Number;
  suggest: boolean;
  progress: Array<{
    courseId: string;
    startCourse: boolean;
    endCourse: boolean;
    completedLectures: string[];
    currentLecture: string;
    percentNumber: number;
    lectureNote: LectureNote[];
  }>;
  favorites: string[];
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}
const contentNoteSchema: Schema<ContentNote> = new mongoose.Schema(
  {
    titleLecture: {
      type: String,
      required: true,
    },
    timeNoteLecture: {
      type: String,
      required: true,
    },
    textNote: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const lectureNoteSchema: Schema<LectureNote> = new mongoose.Schema(
  {
    lectureId: {
      type: String,
      required: true,
    },
    contentNote: {
      type: [contentNoteSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const userSchema: Schema<User> = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Đừng để trống tên đăng nhập của bạn chứ"],
    },
    lastName: {
      type: String,
      required: [true, "Đừng để trống tên đăng nhập của bạn chứ"],
    },
    email: {
      type: String,
      required: [true, "Đừng để trống email của bạn chứ"],
      validate: {
        validator: function (value: string) {
          return regexEmail.test(value);
        },
        message: "Hãy nhập một email hợp lệ nhé",
      },
      unique: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Đừng để trống mật khẩu của bạn chứ"],
      minlength: [6, "Mật khẩu của bạn phải dài hơn 6 ký tự nhé"],
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Number,
      default: 0,
    },
    suggest: {
      type: Boolean,
      default: true,
    },
    progress: [
      {
        courseId: {
          type: String,
          required: true,
        },
        startCourse: {
          type: Boolean,
          default: false,
        },
        endCourse: {
          type: Boolean,
          default: false,
        },
        completedLectures: [String],
        currentLecture: {
          type: String,
        },
        percentNumber: {
          type: Number,
          default: 0,
        },
        lectureNote: [lectureNoteSchema],
      },
    ],
    title: {
      type: String,
    },
    introduction: {
      type: String,
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
        default: null,
      },
    ],
  },
  { timestamps: true }
);

userSchema.virtual("fullName").get(function (this: User) {
  return `${this.firstName} ${this.lastName}`;
});
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

userSchema.pre<User>("save", async function (next) {
  if (!this.isModified("password")) {
    return next;
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "60m",
  });
};

userSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
    expiresIn: "3d",
  });
};

const userModel: Model<User> = mongoose.model("User", userSchema);
export default userModel;
