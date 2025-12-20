import express from "express";
import {
  clerkWebhooks,
  paymentRazorpay,
  userCredits,
  verifyPayment,
} from "../controllers/userController.js";
const userRouter = express.Router();

import authMiddleware from "../middlewares/auth.js";

userRouter.post("/webhooks", clerkWebhooks);

userRouter.get("/credits", authMiddleware, userCredits);

userRouter.post("/pay-razor", authMiddleware, paymentRazorpay);

userRouter.post("/verify-payment", authMiddleware, verifyPayment);

export default userRouter;
