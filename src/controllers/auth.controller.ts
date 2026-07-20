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
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }
    );


    console.log("COOKIE SET:", result.token);


    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: result.user
      }
    });


  } catch (error: unknown) {

    console.log("LOGIN ERROR:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong";


    res.status(400).json({
      success: false,
      message
    });

  }

};

export const getCurrentUser = async (
  req: Request,
  res: Response
) => {

  res.status(200).json({
    success: true,
    data: req.user
  });

};
export const logoutUser = (
  req: Request,
  res: Response
) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};