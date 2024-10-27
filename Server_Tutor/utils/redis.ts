import { Redis } from "ioredis";
require("dotenv").config();

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log("Ket noi redis thanh cong");
    return process.env.REDIS_URL;
  }
  throw new Error("Ket noi redis thanh cong");
};

export const redis = new Redis(redisClient());
