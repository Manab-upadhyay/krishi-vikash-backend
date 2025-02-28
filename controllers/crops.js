import { Crop } from "../models/schema.js";

export default class Crops{
    async SaveCrops(req,res){
        try {
            const newcrop = new Crop(req.body);
            await newcrop.save();
            res.status(201).json({ message: "Farmer registered successfully", crops: newcrop });
            
        } catch (error) {
            console.log("error", error)
            res.status(500).json({ message: " error saving detaile" });
        }

    }
    async getcrops(req,res){
        try {
            const crops = await Crop.find();
          
            res.status(201).json({ message: "Crop details", crop: crops });
            
        } catch (error) {
            console.error(" Error fetching crops :", error);
            res.status(500).json({ error: "Failed to fetch crops" });
        }

    }
}
