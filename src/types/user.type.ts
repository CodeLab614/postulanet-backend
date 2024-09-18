import { Document } from "mongoose";

export const userRole = {
  DEFAULT: "default",
  SUPPORT: "support",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof userRole)[keyof typeof userRole];

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo: string;
  phone: number;
  cvFile: string;
  dateOfBirth: Date;
  socialMedia: [
    {
      id: string;
      name: string;
      url: string;
    }
  ];
  role: UserRole;
  credtis: number;
  emailVerified: boolean;
  isActive: boolean;
  isCompany: boolean;
  //   company: {}
  residency: {
    country: string;
    state: string;
    minucipality: string;
  };
  biography: string;
  skills: string[];
  works: string[];
  educations: string[];
  languages: string[];
  courses: string[];
  certifications: string[];
}
