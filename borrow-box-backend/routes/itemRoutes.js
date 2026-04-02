const express = require("express");
const router = express.Router();

const {
  createItem,
  getItems,
  getItemById,
  getMyItems,
  deleteItem,
  getDashboardData,
} = require("../controllers/itemController");

router.post("/", createItem);
router.get("/", getItems);
router.get("/:id", getItemById);
router.get("/user/:userId", getMyItems);
router.delete("/:id", deleteItem);   
router.get("/dashboard/:userId", getDashboardData);

module.exports = router;