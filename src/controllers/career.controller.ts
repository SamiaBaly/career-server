import { Request, Response } from "express";
import { db } from "../config/db";

import {
  getCareerMatchesService,
  getCareerByIdService,
} from "../services/career.service";
import { ObjectId } from "mongodb";



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
      careers: req.body.careers.map(
        (career: any) => ({
          _id: new ObjectId().toString(),
          ...career,
        })
      ),
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

    const matches =
      await getCareerMatchesService();


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





// ============================
// GET SINGLE CAREER DETAILS
// ============================

export const getCareerById = async (
  req: Request,
  res: Response
) => {

  try {

    const id = req.params.id as string;


    const career =
      await getCareerByIdService(id);



    return res.status(200).json({
      success: true,
      data: career,
    });



  } catch (error: any) {

    console.log(error);


    return res.status(404).json({
      success: false,
      message:
        error.message ||
        "Career not found",
    });

  }

};

