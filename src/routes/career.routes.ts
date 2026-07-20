import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getCareerMatches,
  createCareerMatch
} from "../controllers/career.controller";


const router = Router();


router.post(
  "/",
  authMiddleware,
  createCareerMatch
);


router.get(
  "/",
  authMiddleware,
  getCareerMatches
);


export default router;