import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/userModel.js";

//controller function to remove background from image

const removeBgImage = async (req, res) => {
  try {
    const userData = await userModel.findOne({ clerkId: req.user.clerkId });
    if (!userData) {
      return res.json({ success: false, message: "User Not Found" });
    }

    if (userData.creditBalance === 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: userData.creditBalance,
      });
    }
    const imagePath = req.file.path;

    // fs → Reads the uploaded image from disk
    const imageFile = fs.createReadStream(imagePath);

    // FormData → Sends the image as multipart/form-data
    const formdata = new FormData(); // API accepts only multipart/form-data
    formdata.append("image_file", imageFile);

    // post clipdrop API
    const { data } = await axios.post(
      "https://clipdrop-api.co/remove-background/v1",
      formdata,
      {
        headers: { "x-api-key": process.env.CLIPDROP_API },
        responseType: "arraybuffer",
      }
    );
    //  console.log(userData);
    const base64Image = Buffer.from(data, "binary").toString("base64");

    // Creates a Node.js Buffer from binary data
    // Tells Node: “This input is raw binary bytes” and convert to tostring as base64

    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    await userModel.findByIdAndUpdate(userData._id, {
      creditBalance: userData.creditBalance - 1,
    });

    return res.json({
      success: true,
      resultImage,
      creditBalance: userData.creditBalance - 1,
      message: "Background removed",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { removeBgImage };

// fs → Reads the uploaded image from disk

// FormData → Sends the image as multipart/form-data
