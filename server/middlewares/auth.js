import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;
    // console.log("From header :", req.headers);
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized login Again",
      });
    }

    const token_decode = jwt.decode(token);
    //  console.log(" Decoded token :", token_decode);
    req.user = { clerkId: token_decode.clerkId };
    next();
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
export default authMiddleware;
