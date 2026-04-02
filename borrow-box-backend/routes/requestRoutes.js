import express from "express";
import { createRequest } from "../controllers/requestController.js";
import { getRequestsForOwner } from "../controllers/requestController.js";

const router = express.Router();

router.post("/", createRequest);
router.get("/owner/:ownerId", getRequestsForOwner);

export default router;