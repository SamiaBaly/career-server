import { Request, Response } from "express";
import { db } from "../config/db";
import {
  getCareerMatchesService
} from "../services/career.service";



export const createCareerMatch = async (
  req: Request,
  res: Response
) => {

  try {

    const userId = req.user?.id;


    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }


    const careerData = {

      userId,

      careers: req.body.careers,

      createdAt: new Date(),

    };


    const result =
      await db
        .collection("careerMatches")
        .insertOne(careerData);



    return res.status(201).json({
      success: true,
      data: result,
    });


  } catch (error) {

    console.log(error);


    return res.status(500).json({
      success: false,
      message: "Failed to create career match",
    });

  }

};




export const getCareerMatches = async (
  req: Request,
  res: Response
) => {

  try {

    const userId = req.user?.id;


    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }


    const matches =
      await getCareerMatchesService(userId);



    return res.status(200).json({
      success: true,
      data: matches,
    });



  } catch (error) {

    console.log(error);


    return res.status(500).json({
      success: false,
      message: "Failed to fetch career matches",
    });

  }

};