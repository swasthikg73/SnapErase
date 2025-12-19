import multer from "multer";

//creating multer middleware for parsing formdata
const storage = multer.diskStorage({
  //diskStorage() tells Multer to store uploaded files on the local disk.
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

// const storage = multer.memoryStorage()
const upload = multer({ storage });

export default upload;
