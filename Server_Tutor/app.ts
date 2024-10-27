import express from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddlerware } from "./middleware/error";
import userRouter from "./routes/user.route";
import coursesRouter from "./routes/courses.route";
import orderRouter from "./routes/orders.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";
import streamRouter from "./routes/stream.route";
import categoryRouter from "./routes/category.route";
import commentRouter from "./routes/comment.route";

import path from "path";
import https from "https"; // Thêm https để gửi request tới MoMo
import crypto from "crypto";
require("dotenv").config();

app.use(express.json({ limit: "200mb" }));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/orders", orderRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/layouts", layoutRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/comments", commentRouter);

app.use("/api/stream", streamRouter);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.get("/test", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Ket noi api thanh cong",
  });
});

// Route mới để thanh toán với MoMo
app.post("/api/momo-payment", (req, res, next) => {
  const { amount, orderInfo } = req.body;

  const accessKey = "F8BBA842ECF85";
  const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  const partnerCode = "MOMO";
  const redirectUrl =
    "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  const ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  const requestType = "payWithMethod";
  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;
  const extraData = "";

  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  // Tạo chữ ký HMAC SHA256
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  // Đối tượng JSON gửi tới MoMo
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: "vi",
    requestType: requestType,
    autoCapture: true,
    extraData: extraData,
    signature: signature,
  });

  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };

  // Gửi request tới MoMo
  const momoReq = https.request(options, (momoRes) => {
    let data = "";
    momoRes.on("data", (chunk) => {
      data += chunk;
    });
    momoRes.on("end", () => {
      res.json(JSON.parse(data)); // Trả về kết quả MoMo API
    });
  });

  momoReq.on("error", (e) => {
    res.status(500).json({ error: e.message });
  });

  momoReq.write(requestBody);
  momoReq.end();
});

app.all("*", (req, res, next) => {
  const err = new Error(`Không tim thấy đường dẫn ${req.originalUrl}`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddlerware);
