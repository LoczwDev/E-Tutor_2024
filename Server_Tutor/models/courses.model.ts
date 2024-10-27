import mongoose, { Document, Model, Schema } from "mongoose";
import { User } from "./user.model";

export interface Comment extends Document {
  user: User;
  question: string;
  questionReplies: Comment[];
}

interface Review extends Document {
  user: User;
  rating: number;
  comment: string;
  commentReplies: Comment[];
}

interface AttachFiles extends Document {
  public_id: string;
  url: string;
  original_filename: string;
}

interface Lectures extends Document {
  title: string;
  desc: string;
  video: {
    public_id: string;
    url: string;
    duration: number;
  };
  attachFiles: AttachFiles[];
  notes: string;
  suggestion: string;
  questions: Comment[];
}

interface CurriculumData extends Document {
  title: string;
  lectures: Lectures[];
  durationCurriculum: number;
}

export interface Course extends Document {
  name: string;
  topic: string;
  desc: string;
  price: number;
  estimatedPrice?: number;
  promotion?: number;
  dayExpiry?: string;
  category: string;
  subCategory: string;
  language: string;
  subLanguage: string;
  durations: string;
  typeDurations: string;
  thumbnail: {
    public_id: string;
    url: string;
  };
  trailer: {
    public_id: string;
    url: string;
  };
  level: string;
  benefits: string[];
  audience: string[];
  requirements: string[];
  reviews: Review[];
  curriculumData: CurriculumData[];
  ratings?: number;
  purchased?: number;
  welcomeMessage: string;
  congratulationsMessage: string;
  tutor: User;
  students: User[];
  durationCourse: number;
  status: string;
}

const reviewSchema = new Schema<Review>(
  {
    user: Object,
    rating: {
      type: Number,
      default: 0,
    },
    comment: String,
    commentReplies: [Object],
  },
  { timestamps: true }
);

const commentSchema = new Schema<Comment>(
  {
    user: Object,
    question: String,
    questionReplies: [Object],
  },
  { timestamps: true }
);
const attachFilesSchema = new Schema<AttachFiles>({
  public_id: { type: String },
  url: { type: String },
  original_filename: {
    type: String,
  },
});

const lecturesSchema = new Schema<Lectures>(
  {
    title: String,
    desc: String,
    video: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
      duration: {
        type: Number,
      },
    },
    attachFiles: [attachFilesSchema],
    notes: String,
    suggestion: String,
    questions: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const curriculumDataSchema = new Schema<CurriculumData>({
  title: String,
  lectures: [lecturesSchema],
  durationCurriculum: {
    type: Number,
  },
});

const courseSchema = new Schema<Course>(
  {
    name: {
      type: String,
      required: true,
      // index: true,
    },
    topic: {
      type: String,
      required: true,
      // index: true,
    },
    desc: {
      type: String,
      required: true,
      // index: true,
    },
    price: {
      type: Number,
    },
    estimatedPrice: {
      type: Number,
    },
    promotion: {
      type: Number,
    },
    dayExpiry: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
    },
    language: {
      type: String,
    },
    subLanguage: {
      type: String,
    },
    durations: {
      type: String,
    },
    typeDurations: {
      type: String,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    trailer: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    level: {
      type: String,
      required: true,
    },
    benefits: [String],
    audience: [String],
    requirements: [String],
    reviews: [reviewSchema],
    curriculumData: [curriculumDataSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
    welcomeMessage: {
      type: String,
    },
    congratulationsMessage: {
      type: String,
    },
    tutor: Object,
    students: [Object],
    durationCourse: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

// courseSchema.index({ name: "text", topic: "text", desc: "text" });
// courseSchema.index({ price: 1 });
// courseSchema.index({ ratings: 1 });
// courseSchema.index({ category: 1 });
// courseSchema.index({ subCategory: 1 });

curriculumDataSchema.pre("save", function (next) {
  const curriculum = this as CurriculumData;
  const totalDuration = curriculum.lectures.reduce((total, lecture) => {
    return total + (lecture.video.duration || 0);
  }, 0);
  curriculum.durationCurriculum = totalDuration;
  next();
});

courseSchema.pre("save", function (next) {
  const course = this as Course;
  const totalCourseDuration = course.curriculumData.reduce(
    (total, curriculum) => {
      return total + (curriculum.durationCurriculum || 0);
    },
    0
  );

  course.durationCourse = totalCourseDuration;
  next();
});

const CourseModel: Model<Course> = mongoose.model("Course", courseSchema);
export default CourseModel;
