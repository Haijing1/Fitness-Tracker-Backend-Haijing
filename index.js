import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 5050;

import workoutRoutes from "./routes/workoutRoutes.js";

app.use(express.json());
app.use(cors());

app.use("/workout", workoutRoutes);


// basic home route
app.get("/", (_req, res) => {
  res.send("Welcome to the Fitness Tracker API");
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
