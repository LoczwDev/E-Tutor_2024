import { app } from "./app";
import { initSocketServer } from "./socketServer";
import connectDB from "./utils/db";
import { v2 as cloudinary } from "cloudinary";
import http from "http";
require("dotenv").config();

const server = http.createServer(app);

// cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

initSocketServer(server);

server.listen(process.env.PORT, () => {
  console.log(`Đang chạy ${process.env.PORT}`);
  connectDB();
});
