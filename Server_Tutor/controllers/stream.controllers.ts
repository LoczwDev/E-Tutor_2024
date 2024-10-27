import { NextFunction, Request, Response } from "express";
import { CathAsynsError } from "../middleware/catchAsynsError";
import ErrorHandler from "../utils/ErrorHandler";
import { StreamClient } from "@stream-io/node-sdk";
require("dotenv").config();

export const getTokenStream = CathAsynsError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;
    const apiKey: string | undefined = process.env.PUBLIC_STREAM_API_KEY;
    const secret: string | undefined = process.env.STREAM_SECRET_KEY;

    if (!apiKey || !secret) {
      return next(new ErrorHandler("Stream API credentials are missing", 500));
    }

    if (!user) {
      return next(new ErrorHandler("User is not authenticated", 401));
    }

    const streamClient = new StreamClient(apiKey, secret);

    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;
    const token = streamClient.createToken(user._id, expirationTime, issuedAt);

    res.status(201).json({
      success: true,
      token,
    });
  }
);
