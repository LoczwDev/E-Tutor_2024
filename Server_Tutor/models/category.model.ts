import mongoose, { Document, Model, Schema } from "mongoose";

export interface SubCategory extends Document {
  title: string;
}

export interface Category extends Document {
  title: string;
  imgCategory: {
    public_id: string;
    url: string;
  };
  subCategory: SubCategory[];
  color: string;
}
const subCategorySchema = new Schema<SubCategory>(
  {
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

const categorySchema = new Schema<Category>(
  {
    title: {
      type: String,
      required: true,
    },
    imgCategory: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    subCategory: [subCategorySchema],
    color: String,
  },
  { timestamps: true }
);

const CategoryModel: Model<Category> = mongoose.model(
  "Category",
  categorySchema
);
export default CategoryModel;
