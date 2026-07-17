import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createAnalysis, getAnalysis } from "../controllers/analysis.controller";


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


export default router;