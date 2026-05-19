import express from "express";
import {
  createRequest,
  getRequestsForOwner,
  updateRequestStatus,
  getRequestStatus,
} from "../controllers/requestController.js";

const router = express.Router();

router.post("/", createRequest);

router.get(
  "/owner/:ownerId",
  getRequestsForOwner
);

router.put(
  "/:requestId/status",
  updateRequestStatus
);

router.get(
  "/status/:itemId/:requesterId",
  getRequestStatus
);

export default router;