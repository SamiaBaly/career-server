export interface IAnalysis {

  _id?: string;

  userId: string;

  resumeId: string;

  score: number;

  strengths: string[];

  weaknesses: string[];

  suggestions: string[];

  createdAt: Date;

}