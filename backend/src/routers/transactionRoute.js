import express from "express";
import {
  getTransactionsByUser,
  createTransaction,
  deleteTransaction,
  getSummary,
} from "../controllers/transactionController.js";

const router = express.Router();



router.get("/:userId", getTransactionsByUser);
router.post("/", createTransaction); 
router.delete("/:id", deleteTransaction); 
router.get("/summary/:userId", getSummary);

export default router;
