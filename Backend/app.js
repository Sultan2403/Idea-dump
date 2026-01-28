const express = require("express");
const axios = require("axios");
const cors = require("cors");
const connectDB = require("./DB/connectDB");
const {getAllIdeas, addNewIdea }= require("./DB/ideas");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // To allow frontend to make requests and shii
  }),
);
app.use(express.json());

connectDB();

app.get("/health", (req, res) => {
  res.send("Server says heyyy :)");
});

app.post("/new-idea", addNewIdea)

app.get("/ideas", getAllIdeas);

app.post("/translate", async (req, res) => {
  try {
    const parsedAudio = null; // This is supposd to be the data coming from the third party that parses audio into a format that wispr flow can use. Check out https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API or https://github.com/keithwhor/wavtools

    // const wisprFlowRes = await axios.post(
    //   "https://platform-api.wisprflow.ai/api/v1/dash/api",
    //   req.body,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.WISPR_FLOW_API_KEY}`,
    //       "Content-Type": "application/json",
    //     },
    //   },
    // );
    res.json({ res: wisprFlowRes });
  } catch (error) {
    console.error(error);

    res.send("An error occured: ", error);
  }
});

module.exports = app;
