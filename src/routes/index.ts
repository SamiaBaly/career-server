import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import resumeRoutes from "./resume.routes";

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

export default router;