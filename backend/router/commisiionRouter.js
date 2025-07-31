import express from "express"
import {proofOfCommission} from "../controllers/commissionController.js";
import {isAuthenticated,isAuthorized} from "../middlewares/auth.js";
import { paymentProof } from "../models/commissionProofSchema.js";

const router = express.Router();

router.post("/proof",isAuthenticated,isAuthorized("Auctioneer"),proofOfCommission);

export default router;