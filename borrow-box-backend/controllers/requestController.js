import Request from "../models/Request.js";

export const createRequest = async (req, res) => {
  try {
    const { itemId, requesterId, ownerId, message } = req.body;

    const request = await Request.create({
      itemId,
      requesterId,
      ownerId,
      message,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: "Error creating request" });
  }
};

export const getRequestsForOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const requests = await Request.find({ ownerId })
      .populate("itemId", "title")
      .populate("requesterId", "name phone")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests" });
  }
};