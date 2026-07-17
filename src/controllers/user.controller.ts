import { Request, Response } from "express";
import { getUserProfileService, updateUserProfileService } from "../services/user.service";


export const getMyProfile = async (
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
      await getUserProfileService(
        req.user.id as string
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

export const updateMyProfile = async (
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
      await updateUserProfileService(
        req.user.id,
        req.body
      );


    res.json({
      success: true,
      message: "Profile updated successfully",
      data: result
    });


  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};