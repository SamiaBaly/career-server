import { ObjectId } from "mongodb";


export interface IResume {

  _id?: ObjectId;

  userId: string;

  title: string;

  summary: string;

  skills: string[];

  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];

  education: {
    degree: string;
    institution: string;
    year: string;
  }[];

  projects: {
    name: string;
    description: string;
    techStack: string[];
  }[];

  createdAt: Date;

  updatedAt: Date;

}