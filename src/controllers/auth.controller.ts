import { Request, Response } from "express";
import { registerUserService } from "../services/auth.service";


export const registerUser = async (
  req: Request,
  res: Response
) => {

  try {

    const result =
      await registerUserService(req.body);


    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result
    });


  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};