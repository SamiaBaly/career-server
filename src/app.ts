import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "CareerPilot AI Server is running 🚀",
  });
});

export default app;