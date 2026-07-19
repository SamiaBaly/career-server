import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import resumeRoutes from "./resume.routes";
import analysisRoutes from "./analysis.routes";
import analyticsRoutes from "./analytics.routes";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CareerPilot API v1",
  });
});

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/resumes", resumeRoutes);
router.use(
  "/analysis",
  analysisRoutes
);
router.use(
  "/analytics",
  analyticsRoutes
);

export default router;