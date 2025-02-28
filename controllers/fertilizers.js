import { Fertilizer } from "../models/schema.js";

export default class FertilizerController {

    async SaveDetails(req, res) {
        try {
            const newFertilizer = new Fertilizer(req.body);
            await newFertilizer.save();
            res.status(201).json({ message: "✅ Fertilizer saved successfully", fertilizer: newFertilizer });
        } catch (error) {
            console.error("❌ Error saving fertilizer:", error);
            res.status(500).json({ error: "Failed to save fertilizer details" });
        }
    }


    async GetFertilizers(req, res) {
        try {
            const fertilizers = await Fertilizer.find(); // Fetch all fertilizers
            res.status(200).json({ message: "✅ Fertilizers fetched successfully", fertilizers });
        } catch (error) {
            console.error("❌ Error fetching fertilizers:", error);
            res.status(500).json({ error: "Failed to fetch fertilizers" });
        }
    }
}
