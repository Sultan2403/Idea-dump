const express = require("express");
const cors = require("cors");
const connectDB = require("./DB/Connections/connectDB");
const app = express();
const ideasRouter = require("./Routers/ideas.route");
const audioRouter = require("./Routers/speech-to-text.route");
const userRouter = require("./Routers/users.route");
const { errors } = require("celebrate");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://sultan2403.github.io"],
  }),
);
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: " Looking for something? Well it's not here XD" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server says heyyy :)" });
});

app.use("/ideas", ideasRouter);
app.use("/users", userRouter);
app.use("/speech", audioRouter);

app.use(errors()); 
module.exports = app;
