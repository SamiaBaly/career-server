import { Request, Response } from "express";
import { getAnalyticsService } from "../services/analytics.service";

export const getAnalytics = async (
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

    const result = await getAnalyticsService(
      req.user.id
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