import { Request, Response } from "express";
import {
  createResumeService,
  deleteResumeService,
  getMyResumesService,
  getSingleResumeService,
  updateResumeService
} from "../services/resume.service";


export const createResume = async (
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
      await createResumeService(
        req.user.id,
        req.body
      );


    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      data: result
    });


  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};



export const getMyResumes = async (
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
      await getMyResumesService(
        req.user.id
      );


    res.status(200).json({
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

export const getSingleResume = async (
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
      await getSingleResumeService(
        req.user.id,
        req.params.id as string
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

export const updateResume = async (
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
      await updateResumeService(
        req.user.id,
        req.params.id as string,
        req.body
      );


    res.json({
      success: true,
      message: "Resume updated successfully",
      data: result
    });


  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

export const deleteResume = async (
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


    await deleteResumeService(
      req.user.id,
      req.params.id as string
    );


    res.json({
      success: true,
      message: "Resume deleted successfully"
    });


  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};