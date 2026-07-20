import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser
} from "../controllers/auth.controller";

import { authMiddleware } from "../middlewares/auth.middleware";


const router = Router();


router.post(
  "/register",
  registerUser
);


router.post(
  "/login",
  loginUser
);


router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);
router.post("/logout", logoutUser);


export default router;