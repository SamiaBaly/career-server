import { ObjectId } from "mongodb";
import { resumeCollection } from "../models/resume.model";
import { IResume } from "../types/resume.types";


export const createResumeService = async (
  userId: string,
  resumeData: Omit<IResume, "_id" | "userId" | "createdAt" | "updatedAt">
) => {


  const newResume: IResume = {

    userId,

    ...resumeData,

    createdAt: new Date(),

    updatedAt: new Date()

  };


  const result =
    await resumeCollection.insertOne(
      newResume
    );


  return {
    id: result.insertedId,
    ...newResume
  };

};




export const getMyResumesService = async (
  userId: string
) => {


  const resumes =
    await resumeCollection
      .find({
        userId
      })
      .toArray();


  return resumes;

};

export const getSingleResumeService = async (
  userId: string,
  resumeId: string
) => {

  const resume =
    await resumeCollection.findOne({
      _id: new ObjectId(resumeId),
      userId
    });


  if (!resume) {
    throw new Error("Resume not found");
  }


  return resume;

};

export const updateResumeService = async (
  userId: string,
  resumeId: string,
  data: Partial<IResume>
) => {

  const result =
    await resumeCollection.findOneAndUpdate(
      {
        _id: new ObjectId(resumeId),
        userId
      },
      {
        $set: {
          ...data,
          updatedAt: new Date()
        }
      },
      {
        returnDocument: "after"
      }
    );


  if (!result) {
    throw new Error("Resume not found");
  }


  return result;

};

export const deleteResumeService = async (
  userId: string,
  resumeId: string
) => {

  const result =
    await resumeCollection.deleteOne({
      _id: new ObjectId(resumeId),
      userId
    });


  if (result.deletedCount === 0) {
    throw new Error("Resume not found");
  }


  return result;

};