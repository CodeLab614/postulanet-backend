import { Schema, model, Types } from "mongoose";
import { IToken } from "../types";

const tokenSchema: Schema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    expiresAt: {
      type: Date,
      default: Date.now(),
      expires: "10m",
    },
  },
  {
    timestamps: true,
  }
);

export const Token = model<IToken>("Token", tokenSchema);
