import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import careerRoutes from "./routes/career.routes";

const app: Application = express();



app.use(
  cors({
    origin: "https://career-client-seven.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", routes);
app.use(
  "/api/v1/career",
  careerRoutes
);

export default app;