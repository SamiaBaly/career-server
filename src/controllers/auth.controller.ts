import { Request, Response } from "express";
import { loginUserService, registerUserService } from "../services/auth.service";


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

export const loginUser = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      email,
      password
    } = req.body;


    const result =
      await loginUserService(
        email,
        password
      );


    res.cookie(
      "token",
      result.token,
      {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      }
    );


    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: result.user
      }
    });


  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};