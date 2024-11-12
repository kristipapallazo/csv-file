const fs = require("fs");
const axios = require("axios");
const path = require("path");
const FormData = require("form-data");

async function sendCsvFile() {
  try {
    const filename = "file.csv";
    const filePath = path.join(__dirname, filename);
    const fileStream = fs.createReadStream(filePath);

    // Create form data and append the file
    const formData = new FormData();
    formData.append("file", fileStream);

    // Send POST request with the file
    const url = "http://localhost:3000";
    const response = await axios.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    console.log("File sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending file:", error);
  }
}

module.exports = sendCsvFile;
