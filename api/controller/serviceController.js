import Service from "../models/serviceModel.js";
import { errorHandler } from "../utils/error.js";

export const createService = async (req, res, next) => {
  if (!req.hospital.isAdmin) {
    return next(
      errorHandler(401, "You are not authorized to add new Services")
    );
  }
  if (!req.body.name || !req.body.price || !req.body.status) {
    return next(errorHandler(400, "Please fill all the fields"));
  }
  const newService = new Service({
    ...req.body,
    userId: req.hospital.id,
  });
  try {
    const savedService = await newService.save();
    res.status(201).json({
      success: true,
      Service: savedService,
    });
  } catch (error) {
    next(error);
  }
};

export const getService = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const services = await Service.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.name && { name: req.query.name }),
      ...(req.query.serviceId && { _id: req.query.serviceId }),
      ...(req.query.searchTerm && {
        $or: [
          { name: { $regex: req.query.searchTerm, $options: "i" } },
          { price: { $regex: req.query.searchTerm, $options: "i" } },
          { status: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ [req.query.sortBy || "createdAt"]: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalServices = await Service.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonth = await Service.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      success: true,
      services,
      totalServices,
      lastMonth,
    });
  } catch (error) {
    next(error);
  }
};
