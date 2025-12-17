import express from "express";
import { clerkWebhooks, userCredits } from "../controllers/userController.js";
const userRouter = express.Router();

import authMiddleware from "../middlewares/auth.js";

userRouter.post("/webhooks", clerkWebhooks);

userRouter.get("/credits", authMiddleware, userCredits);

export default userRouter;
