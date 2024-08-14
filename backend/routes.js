import { Router } from "express";
import axios from "axios";
import upload from "./multer.middleware.js";
import fs from "fs";
import { PdfReader } from "pdfreader";

const router = Router();

router.route("/chat").post(async (req, res) => {
  const { input, gpt, prevMessages } = req.body;
  const data = {
    model: gpt === "4" ? "gpt-4" : "gpt-3.5-turbo",
    messages: [
      ...prevMessages,
      {
        role: "user",
        content: input,
      },
    ],
  };


  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.status(200).json(response.data.choices[0].message);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.route("/search").post(async (req, res) => {
  const { query } = req.body;

  try {
    const response = await axios.get(
      `https://api.openai.com/v1/search?documents=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function extractTextFromPDF(filePath) {
  return new Promise((resolve, reject) => {
    let result = "";

    new PdfReader().parseFileItems(filePath, (err, item) => {
      if (err) {
        reject(err);
      } else if (item) {
        result += item.text;
      } else {
        // End of file processing
        resolve(result);
      }
    });
  });
}

router.route("/file").post(upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  let { gpt, prevMessages } = req.body;
  prevMessages = JSON.parse(prevMessages);
  const input = await extractTextFromPDF(filePath);
  const data = {
    model: gpt === "4" ? "gpt-4" : "gpt-3.5-turbo",
    messages: [
      ...prevMessages,
      {
        role: "user",
        content: input,
      },
    ],
  };


  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const resData = response.data.choices[0].message
    resData.input = input;
    res.status(200).json(resData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    fs.unlinkSync(filePath);
  }
});

export default router;
