import { analysisCollection } from "../models/analysis.model";
import { IAnalysis } from "../types/analysis.types";


export const createAnalysisService = async (
  userId: string,
  resumeId: string
) => {


  const analysisData: IAnalysis = {

    userId,

    resumeId,

    score: 85,

    strengths: [
      "Strong React knowledge",
      "Good project experience"
    ],

    weaknesses: [
      "No testing experience mentioned",
      "No cloud skills"
    ],

    suggestions: [
      "Add Docker skills",
      "Include more measurable achievements"
    ],

    createdAt: new Date()

  };


  const result =
    await analysisCollection.insertOne(
      analysisData
    );


  return {
    id: result.insertedId,
    ...analysisData
  };

};

export const getAnalysisService = async (
  userId: string,
  resumeId: string
) => {

  const analysis =
    await analysisCollection.findOne({
      userId,
      resumeId
    });


  if (!analysis) {
    throw new Error("Analysis not found");
  }


  return analysis;

};