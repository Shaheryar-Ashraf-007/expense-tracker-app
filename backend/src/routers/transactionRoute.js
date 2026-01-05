import express from "express";
import {
  getTransactionsByUser,
  createTransaction,
  deleteTransaction,
  getSummary,
} from "../controllers/transactionController.js";

const router = express.Router();


router.get("/transactions/summary/:userId", getSummary);
router.get("/transactions/:userId", getTransactionsByUser);
router.post("/transactions/", createTransaction);
router.delete("/transactions/:id", deleteTransaction);

export default router;
