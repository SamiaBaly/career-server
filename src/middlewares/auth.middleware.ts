import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const token = req.cookies.token;


    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }


    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET as string
      );

    console.log("JWT DATA:", decoded);
    req.user = decoded as {
      id: string;
      email: string;
      role: "user" | "admin";
    };

    next();


  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });

  }
  console.log("=================================");
  console.log("URL:", req.originalUrl);
  console.log("COOKIE:", req.cookies.token);
  
  console.log("=================================");

};