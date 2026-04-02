const Item = require("../models/Item");

// CREATE ITEM
exports.createItem = async (req, res) => {
  try {
    const { title, category, type, description, image } = req.body;

    const item = await Item.create({
      title,
      category,
      type,
      description,
      image,
      user: req.body.userId, // 🔥 important
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error creating item" });
  }
};

exports.getMyItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const items = await Item.find({ user: userId });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user items" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
};

// GET ALL ITEMS
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().populate("user", "name phone").sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items" });
  }
};

// GET SINGLE ITEM
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("user", "_id name phone");

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item" });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const { userId } = req.params;

    const items = await Item.find({ user: userId });

    const totalItems = items.length;

    // last 3 items
    const recentItems = items.slice(-3).reverse();

    res.json({
      totalItems,
      recentItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};