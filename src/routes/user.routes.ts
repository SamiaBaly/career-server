import { Router } from "express";

import {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/user.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

/* ===========================
          USER
=========================== */

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

/* ===========================
          ADMIN
=========================== */

router.get(
  "/admin-test",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Admin access granted",
    });
  }
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);

router.patch(
  "/:id/role",
  authMiddleware,
  roleMiddleware("admin"),
  updateUserRole
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

export default router;