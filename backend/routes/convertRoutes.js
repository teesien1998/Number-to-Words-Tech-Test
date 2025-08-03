import express from "express";
import { convertNumberToWords } from "../controllers/convertController.js";

const router = express.Router();

router.post("/", convertNumberToWords);

export default router;
