const express = require("express");
const cors = require("cors");
const connectDB = require("./DB/Connections/connectDB");
const app = express();
const ideasRouter = require("./Routers/ideas.route");
const audioRouter = require("./Routers/speech-to-text.route")

app.use(
  cors({
    origin: "http://localhost:5173", // To allow frontend to make requests and shii
  }),
);
app.use(express.json());

connectDB();

app.get("/health", (req, res) => {
  res.status(200).json({message: "Server says heyyy :)"});
});

app.use("/ideas", ideasRouter);
app.use("/speech", audioRouter);

module.exports = app;

