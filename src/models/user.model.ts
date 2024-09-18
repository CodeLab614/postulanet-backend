import { Schema, model } from "mongoose";
import { IUser, userRole } from "../types";

const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
    },
    phone: {
      type: Number,
    },
    cvFile: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    socialMedia: [
      {
        id: {
          type: String,
          trim: true,
        },
        name: {
          type: String,
          trim: true,
        },
        url: {
          type: String,
          trim: true,
        },
      },
    ],
    role: {
      type: String,
      enum: Object.values(userRole),
      default: userRole.DEFAULT,
    },
    credits: {
      type: Number,
      required: true,
      default: 0,
    },
    emailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    isCompany: {
      type: Boolean,
      required: true,
      default: false,
    },
    residency: {
      country: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      minucipality: {
        type: String,
        trim: true,
      },
    },
    biography: {
      type: String,
      trim: true,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    works: [
      {
        type: String,
        trim: true,
      },
    ],
    educations: [
      {
        type: String,
        trim: true,
      },
    ],
    languages: [
      {
        type: String,
        trim: true,
      },
    ],
    courses: [
      {
        type: String,
        trim: true,
      },
    ],
    certifications: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
