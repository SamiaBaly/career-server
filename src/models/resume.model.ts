import { Collection } from "mongodb";
import { db } from "../config/db";
import { IResume } from "../types/resume.types";



export const resumeCollection: Collection<IResume> =
  db.collection<IResume>("resumes");