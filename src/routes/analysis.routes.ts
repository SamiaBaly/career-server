import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createAnalysis, getAnalysis, getMyAnalyses } from "../controllers/analysis.controller";


const router = Router();


router.post(
  "/:resumeId",
  authMiddleware,
  createAnalysis
);

router.get(
  "/:resumeId",
  authMiddleware,
  getAnalysis
);

router.get(
  "/",
  authMiddleware,
  getMyAnalyses
);


export default router;