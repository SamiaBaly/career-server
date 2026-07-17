import { Router } from "express";
import userRoutes from "./user.routes";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CareerPilot API v1",
  });
});

router.use("/users", userRoutes);

export default router;