const express = require("express");
const sendCsvFile = require("../csvFile.js");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads", // Folder to store uploaded files
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create the upload endpoint
router.post("/", upload.single("file"), (req, res) => {
  try {
    // `req.file` contains the uploaded file info
    if (req.file) {
      console.log("File received:", req.file);
      res
        .status(200)
        .send({ message: "File uploaded successfully", file: req.file });
    } else {
      res.status(400).send({ message: "No file uploaded" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error uploading file", error });
  }
});
router.get("/test", async (req, res) => {
  await sendCsvFile();
  res.end("test route");
});

module.exports = router;
