import { Request, Response } from "express";
import { userCollection } from "../models/user.model";
import { resumeCollection } from "../models/resume.model";
import { analysisCollection } from "../models/analysis.model";
import { adminDeleteResumeService, getAllResumesService } from "../services/resume.service";
import { adminDeleteAnalysisService, getAllAnalysesService } from "../services/analysis.service";


export const getAdminStats = async (
  req: Request,
  res: Response
) => {

  try {

    const totalUsers =
      await userCollection.countDocuments();


    const totalResumes =
      await resumeCollection.countDocuments();


    const totalAnalyses =
      await analysisCollection.countDocuments();



    res.json({

      success: true,

      data: {
        totalUsers,
        totalResumes,
        totalAnalyses
      }

    });


  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Failed to load admin stats"

    });

  }

};
export const getAllResumes = async (
  req: Request,
  res: Response
) => {

  try {

    const resumes =
      await getAllResumesService();

    res.status(200).json({
      success: true,
      data: resumes,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



export const adminDeleteResume = async (
  req: Request,
  res: Response
) => {

  try {

    await adminDeleteResumeService(
      req.params.id as string
    );

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

export const getAllAnalyses = async (
  req: Request,
  res: Response
) => {

  try {

    const analyses =
      await getAllAnalysesService();

    res.status(200).json({
      success: true,
      data: analyses,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const adminDeleteAnalysis = async (
  req: Request,
  res: Response
) => {

  try {

    await adminDeleteAnalysisService(
      req.params.id as string
    );

    res.status(200).json({
      success: true,
      message: "Analysis deleted successfully",
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};