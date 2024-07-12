require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const aylien = require("aylien_textapi");
const FormData = require("form-data");

const app = express();

const cors = require("cors");
app.use(cors());
app.use(bodyParser.json()); // to use json

// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("dist"));

app.get("/", function (req, res) {
  console.log(`Your API Key is 111${process.env.API_KEY}`);
  res.sendFile(path.resolve("dist/index.html"));
});

const textapi = new aylien({
  application_id: process.env.AYLIEN_APP_ID,
  application_key: process.env.AYLIEN_APP_KEY,
});

console.log(`Test AYLIEN ${textapi}`);

// POST Route
app.post("/api/validate", async function (req, res) {
  console.log(__dirname);
  const formdata = new FormData();
  formdata.append("key", process.env.API_KEY);
  formdata.append("txt", "text");
  formdata.append("lang", "en");

  try {
    // Make POST request with axios
    const response = await axios.post(req.body.text, formdata, {
      headers: {
        ...formdata.getHeaders(), // Include FormData headers
      },
    });

    // Send only the response data
    res.json(response.data);
  } catch (error) {
    // Only send error message to client
    res.status(error.response ? error.response.status : 500).json({
      error: error.message,
      details: error.response ? error.response.data : "No response data",
    });
  }
});

// Designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
