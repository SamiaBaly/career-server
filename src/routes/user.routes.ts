import { Router } from "express";

import {
  getMyProfile,
  updateMyProfile
} from "../controllers/user.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";


const router = Router();


router.get(
  "/me",
  authMiddleware,
  getMyProfile
);


router.patch(
  "/profile",
  authMiddleware,
  updateMyProfile
);


router.get(
  "/admin-test",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {

    res.json({
      success: true,
      message: "Admin access granted"
    });

  }
);


export default router;