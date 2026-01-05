import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initDB } from "./config/db.js";
import transactionRouter from "./routers/transactionRoute.js";
import rateLimiter from "./middleware/rateLimiter.js";
import job from "./config/crons.js";

dotenv.config(); // ✅ MUST be first

const app = express();

if (process.env.NODE_ENV === "production") job.start();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Rate limiter ONLY for API
app.use("/api", rateLimiter);

// Routes
app.use("/api", transactionRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  initDB();
});

export default app;
