import express from "express";

import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import transactionRouter from "./routers/transactionRoute.js"
import rateLimiter from "./middleware/rateLimiter.js";
// import cors from "cors";

import job from "./config/crons.js";

if (process.env.NODE_ENV === "production") job.start()


dotenv.config();

const app = express();

app.use(rateLimiter);

// app.use(cors({
//   origin: 'http://localhost:8081',
//   credentials: true,
// }));

app.use(express.json());

app.use("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/transactions", transactionRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  initDB();
});

export default app;
