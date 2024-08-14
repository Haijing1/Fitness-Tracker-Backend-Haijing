import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 5050;

import upperBodyRoutes from "./routes/upperBodyRoutes.js";
import lowerBodyRoutes from "./routes/lowerBodyRoutes.js";

app.use(express.json());
app.use(cors());

app.use("/workout/upperBodyRoutes", upperBodyRoutes);
app.use("/workout/lowerBodyRoutes", lowerBodyRoutes);

// basic home route
app.get("/", (_req, res) => {
  res.send("Welcome to the Fitness Tracker API");
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
