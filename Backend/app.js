const express = require("express");
const cors = require("cors");
const connectDB = require("./DB/Connections/connectDB");
const app = express();
const ideasRouter = require("./Routers/ideas.route");
const audioRouter = require("./Routers/speech-to-text.route");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://sultan2403.github.io"],
  }),
);
app.use(express.json());

connectDB();

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server says heyyy :)" });
});

app.use("/ideas", ideasRouter);
app.use("/speech", audioRouter);

module.exports = app;
