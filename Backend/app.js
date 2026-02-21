// Main
const express = require("express");
const app = express();
const connectDB = require("./DB/Connections/connectDB");

// Routers
const ideasRouter = require("./Routers/ideas.route");
const audioRouter = require("./Routers/speech-to-text.route");
const authRouter = require("./Routers/auth.route");

// Middlewares
const { errors } = require("celebrate");
const cors = require("cors");

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://sultan2403.github.io"],
  }),
);
app.use(express.json());



app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: " Looking for something? Well it's not here XD" });
});

app.get("/health", (req, res) => {
  res.status(200).json({success: true, message: "Server says heyyy :)" });
});

// Routes
app.use("/ideas", ideasRouter);
app.use("/auth", authRouter);
app.use("/speech", audioRouter);

app.use(errors()); 

module.exports = app;