import { ObjectId } from "mongodb";


import { analysisCollection } from "../models/analysis.model";
import { resumeCollection } from "../models/resume.model";
import { IAnalysis } from "../types/analysis.types";
import { db } from "../config/db";


import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const createAnalysisService = async (
  userId: string,
  resumeId: string
) => {


  // 1. Find Resume

  const resume =
    await resumeCollection.findOne({

      _id: new ObjectId(resumeId),

      userId

    });



  if (!resume) {

    throw new Error(
      "Resume not found"
    );

  }


  // 2. Send Resume To OpenAI


  const prompt = `
You are an expert Resume Reviewer and Career Advisor.

Analyze the resume and return ONLY valid JSON.

{
  "score": 0,
  "strengths": [
    ""
  ],
  "weaknesses": [
    ""
  ],
  "suggestions": [
    ""
  ],
  "careers": [
    {
      "title": "",
      "matchPercentage": 0,
      "requiredSkills": [],
      "missingSkills": [],
      "reason": ""
    }
  ]
}

Rules:
- Score must be between 0 and 100.
- Recommend exactly 3 careers.
- matchPercentage must be between 0 and 100.
- requiredSkills should contain important skills for that career.
- missingSkills should contain only skills missing from the resume.
- reason should briefly explain why the career fits.

Resume:
${JSON.stringify(resume)}
`;

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: `
You are an expert career advisor.

Return ONLY valid JSON.

{
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "careers": [
    {
      "title": "",
      "matchPercentage": 0,
      "requiredSkills": [],
      "missingSkills": []
    }
  ]
}
      `,
      },
      {
        role: "user",
        content: JSON.stringify(resume),
      },
    ],
    temperature: 0.4,
  });

  const aiResult = JSON.parse(
    response.choices[0].message.content || "{}"
  );

  // 3. Save Analysis


  const analysisData: IAnalysis = {
    userId,
    resumeId,
    score: Number(aiResult.score ?? 0),
    strengths: Array.isArray(aiResult.strengths)
      ? aiResult.strengths
      : [],
    weaknesses: Array.isArray(aiResult.weaknesses)
      ? aiResult.weaknesses
      : [],
    suggestions: Array.isArray(aiResult.suggestions)
      ? aiResult.suggestions
      : [],
    createdAt: new Date(),
  };

  const result =
    await analysisCollection.insertOne(
      analysisData
    );


  // 4. Career Match (temporary)

  // 4. Career Match

  const careers = Array.isArray(aiResult.careers)
    ? aiResult.careers.map((career: any) => ({
      _id: new ObjectId().toString(),
      title: career.title,
      matchPercentage: Number(
        career.matchPercentage ?? 0
      ),
      requiredSkills: career.requiredSkills ?? [],
      missingSkills: career.missingSkills ?? [],
      reason: career.reason ?? "",
    }))
    : [];


  await db.collection("careerMatches").insertOne({
    userId,
    resumeId,
    careers,
    createdAt: new Date(),
  });







  return {

    id:
      result.insertedId,


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

    throw new Error(
      "Analysis not found"
    );

  }



  return analysis;

};

export const getMyAnalysesService = async (

  userId: string

) => {


  const analyses =

    await analysisCollection

      .find({

        userId

      })

      .toArray();





  return analyses;

};

/* ===========================
          ADMIN
=========================== */

export const getAllAnalysesService = async () => {

  const analyses = await analysisCollection
    .find({})
    .toArray();

  return analyses;

};

export const adminDeleteAnalysisService = async (
  id: string
) => {

  const result = await analysisCollection.deleteOne({
    _id: new ObjectId(id),
  });

  if (result.deletedCount === 0) {
    throw new Error("Analysis not found");
  }

  return result;

};