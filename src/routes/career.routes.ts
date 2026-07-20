import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import {
  getCareerMatches,
  createCareerMatch,
  getCareerById,
} from "../controllers/career.controller";


const router = Router();



router.post(
  "/",
  authMiddleware,
  createCareerMatch
);



router.get(
  "/",
 
  getCareerMatches
);



router.get(
  "/:id",
  authMiddleware,
  getCareerById
);



export default router;