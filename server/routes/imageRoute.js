import express from "express";
import { removeBgImage } from "../controllers/imageController.js";
import upload from "../middlewares/multer.js";
import authMiddleware from "../middlewares/auth.js";

const imageRouter = express.Router();

imageRouter.post(
  "/remove-bg",
  upload.single("image"),
  authMiddleware,
  removeBgImage
);

export default imageRouter;
