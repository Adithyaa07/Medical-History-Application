import Campaign from "../models/campaignModel.js";
import { errorHandler } from "../utils/error.js";

export const createCampaign = async(req, res, next) => {
    if (!req.hospital.isAdmin) {
        return next(errorHandler(401, "You are not authorized to add new Campaigns"));
    }
    if (!req.body.offer || !req.body.hospital || !req.body.Message) {
        return next(errorHandler(400, "Please fill all the fields"));
    }
    const newCampaign = new Campaign({
        ...req.body,
        userId: req.hospital.id,
    });
    try {
        const savedCampaign = await newCampaign.save();
        res.status(201).json({
            success: true,
            Campaign: savedCampaign,
        });
    } catch (error) {
        next(error);
    }
}

export const getCampaign = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === "asc" ? 1 : -1;
        const campaigns = await Campaign.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.offer && { offer: req.query.offer }),
            ...(req.query.campaignId && { _id: req.query.campaignId }),
            ...(req.query.searchTerm && {
                $or: [
                    { offer: { $regex: req.query.searchTerm, $options: "i" } },
                    { hospital: { $regex: req.query.searchTerm, $options: "i" } },
                    { Message: { $regex: req.query.searchTerm, $options: "i" } },
                ],
            }),
        })
            .sort({ [req.query.sortBy || "createdAt"]: sortDirection })
            .skip(startIndex)
            .limit(limit);
        res.status(200).json({
            success: true,
            campaigns,
        });
    } catch (error) {
        next(error);
    }
}