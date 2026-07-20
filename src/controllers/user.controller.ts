import { Request, Response } from "express";
import {
  getUserProfileService,
  updateUserProfileService,
  getAllUsersService,
  updateUserRoleService,
  deleteUserService,
} from "../services/user.service";

export const getMyProfile = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await getUserProfileService(req.user.id);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMyProfile = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await updateUserProfileService(
      req.user.id,
      req.body
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
        ADMIN
=========================== */

export const getAllUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await getAllUsersService();

    res.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserRole = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await updateUserRoleService(
      req.params.id,
      req.body.role
    );

    res.json({
      success: true,
      message: "Role updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteUserService(req.params.id);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};