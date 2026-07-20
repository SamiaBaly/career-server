import { ObjectId } from "mongodb";

export interface IAnalysis {

  _id?: ObjectId;

  userId: string;

  resumeId: string;

  score: number;

  strengths: string[];

  weaknesses: string[];

  suggestions: string[];

  createdAt: Date;

}