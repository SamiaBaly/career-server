import { Request, Response } from "express";
import { createAnalysisService, getAnalysisService } from "../services/analysis.service";


export const createAnalysis = async (
  req: Request,
  res: Response
) => {

  try {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }


    const result =
      await createAnalysisService(
        req.user.id,
        req.params.resumeId as string
      );


    res.status(201).json({
      success: true,
      message: "Analysis created successfully",
      data: result
    });


  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

export const getAnalysis = async (
  req: Request,
  res: Response
) => {

  try {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }


    const result =
      await getAnalysisService(
        req.user.id,
        req.params.resumeId as string
      );


    res.json({
      success: true,
      data: result
    });


  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};