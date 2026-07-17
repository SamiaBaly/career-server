import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import {
  createResume,
  deleteResume,
  getMyResumes,
  getSingleResume,
  updateResume
} from "../controllers/resume.controller";


const router = Router();


router.post(
  "/",
  authMiddleware,
  createResume
);


router.get(
  "/",
  authMiddleware,
  getMyResumes
);


router.get(
  "/:id",
  authMiddleware,
  getSingleResume
);
router.patch(
  "/:id",
  authMiddleware,
  updateResume
);

router.delete(
  "/:id",
  authMiddleware,
  deleteResume
);


export default router;