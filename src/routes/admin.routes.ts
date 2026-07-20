import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

import {
  getAdminStats,
  getAllResumes,
  adminDeleteResume,
  getAllAnalyses,
  adminDeleteAnalysis,
} from "../controllers/admin.controller";

const router = Router();

router.get(
  "/stats",
  authMiddleware,
  roleMiddleware("admin"),
  getAdminStats
);

router.get(
  "/resumes",
  authMiddleware,
  roleMiddleware("admin"),
  getAllResumes
);

router.delete(
  "/resumes/:id",
  authMiddleware,
  roleMiddleware("admin"),
  adminDeleteResume
);

router.get(
  "/analyses",
  authMiddleware,
  roleMiddleware("admin"),
  getAllAnalyses
);

router.delete(
  "/analyses/:id",
  authMiddleware,
  roleMiddleware("admin"),
  adminDeleteAnalysis
);

export default router;