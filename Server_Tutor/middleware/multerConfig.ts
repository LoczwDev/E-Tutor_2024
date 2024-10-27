import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadPDF = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1000000, // 5MB
  },
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (ext !== ".pdf") {
      return cb(new Error("Bạn hãy chọn 1 tệp PDF hợp lệ"));
    }
    cb(null, true);
  },
});

export default uploadPDF;
