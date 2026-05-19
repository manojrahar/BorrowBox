import Request from "../models/Request.js";

export const createRequest = async (req, res) => {
  try {
    const {
      itemId,
      requesterId,
      ownerId,
      message,
    } = req.body;

    // CHECK EXISTING REQUEST
    const existingRequest =
      await Request.findOne({
        itemId,
        requesterId,
      });

    if (existingRequest) {
      return res.json(existingRequest);
    }

    const request =
      await Request.create({
        itemId,
        requesterId,
        ownerId,
        message,
      });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({
      message:
        "Error creating request",
    });
  }
};

export const getRequestsForOwner =
  async (req, res) => {
    try {
      const { ownerId } =
        req.params;

      const requests =
        await Request.find({
          ownerId,
        })
          .populate(
            "itemId",
            "title"
          )
          .populate(
            "requesterId",
            "name phone"
          )
          .sort({
            createdAt: -1,
          });

      res.json(requests);
    } catch (error) {
      res.status(500).json({
        message:
          "Error fetching requests",
      });
    }
  };

export const updateRequestStatus =
  async (req, res) => {
    try {
      const { requestId } =
        req.params;

      const { status } =
        req.body;

      const updatedRequest =
        await Request.findByIdAndUpdate(
          requestId,
          { status },
          { new: true }
        );

      res.json(updatedRequest);
    } catch (error) {
      res.status(500).json({
        message:
          "Error updating request",
      });
    }
  };

// GET REQUEST STATUS
export const getRequestStatus =
  async (req, res) => {
    try {
      const {
        itemId,
        requesterId,
      } = req.params;

      const request =
        await Request.findOne({
          itemId,
          requesterId,
        });

      res.json(request);
    } catch (error) {
      res.status(500).json({
        message:
          "Error fetching request status",
      });
    }
  };