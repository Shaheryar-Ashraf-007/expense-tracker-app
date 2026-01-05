import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import transactionRouter from "./routers/transactionRoute.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import job from "./config/crons.js";

if (process.env.NODE_ENV === "production") job.start();

dotenv.config();

const app = express();

// Explicitly allow all origins, headers, and methods

const corsOptions = {
  origin: "*", // allow all origins for testing; in production, replace * with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // respond to OPTIONS requests

// Must come AFTER cors()
app.use(rateLimiter);
app.use(express.json());

// Health check
app.use("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Transaction routes
app.use("/api/transactions", transactionRouter);

// Listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  initDB();
});

export default app;
