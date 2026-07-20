import { Request, Response } from "express";
import { getAnalyticsService } from "../services/analytics.service";

export const getAnalytics = async (
  req: Request,
  res: Response
) => {

  try {

    console.log("AUTH USER:", req.user);


    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }


    const result =
      await getAnalyticsService(
        req.user.id
      );


    res.status(200).json({
      success: true,
      data: result
    });


  } catch (error: any) {

    console.log("ANALYTICS ERROR:", error.message);


    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};