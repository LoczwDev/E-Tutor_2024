import { Document, model, Schema } from "mongoose";

interface FaqData {
  question: string;
  answer: string;
}

interface Category {
  title: string;
}

interface SubCategory extends Document {
  title: string;
  category: Schema.Types.ObjectId;
}

interface BannerImg {
  public_id: string;
  url: string;
}

interface Layout extends Document {
  type: string;
  faq?: FaqData[];
  categories?: Category[];
  subCategories?: SubCategory[];
  banner?: {
    imageBanner: BannerImg;
    title: string;
    subTitle: string;
  };
}

const faqSchema = new Schema<FaqData>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const categorySchema = new Schema<Category>({
  title: { type: String, required: true },
});

const subCategorySchema = new Schema<SubCategory>({
  title: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

const bannerImgSchema = new Schema<BannerImg>({
  public_id: { type: String, required: true },
  url: { type: String, required: true },
});

const layoutSchema = new Schema<Layout>({
  type: { type: String, required: true },
  faq: [faqSchema],
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  subCategories: [{ type: Schema.Types.ObjectId, ref: "SubCategory" }],
  banner: {
    imageBanner: bannerImgSchema,
    title: { type: String },
    subTitle: { type: String },
  },
});

const LayoutModel = model<Layout>("Layout", layoutSchema);

export default LayoutModel;
