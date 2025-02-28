import { Farmer } from "../models/schema.js";
import jwt from "json-web-token"
import bcrypt from "bcrypt"

import { GenerateJwtToken } from "../jwt/generate.token.js";

export default class FarmerDetails {
    constructor() {}

  
    async  SaveDetails(req, res) {
        try {
            const {
                name,
                phone_number,
                email,
                password,
                location,
                preferred_language,
                age,
                gender,
                farm_size,
                farming_type,
                experience_years,
                education_level,
                status
            } = req.body;
    
            // Check if email or phone number already exists
            // const existingFarmer = await Farmer.findOne({ $or: [{ email }, { phone_number }] });
            // if (existingFarmer) {
            //     return res.status(400).json({ error: "Farmer already registered with this email or phone number" });
            // }
    
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
    
            // Create new farmer
            const newFarmer = new Farmer({
                name,
                phone_number,
                email,
                password: hashedPassword,
                location,
                preferred_language,
                age,
                gender,
                farm_size,
                farming_type,
                experience_years,
                education_level,
                registration_date: new Date(),
                status: status || "active"
            });
    
            await newFarmer.save();
    
          
            const token = GenerateJwtToken(newFarmer,req,res)
    
            res.status(201).json({ message: "Farmer registered successfully", token, farmer: newFarmer });
        } catch (error) {
            console.error("Error saving farmer details:", error);
            res.status(500).json({ error: "Failed to save farmer details" });
        }
    }

    async GetFarmers(req, res) {
        try {
            const farmers = await Farmer.find(); // Fetch all farmers
            res.status(200).json({ message: " Farmers fetched successfully", farmers });
        } catch (error) {
            console.error(" Error fetching farmers:", error);
            res.status(500).json({ error: "Failed to fetch farmers" });
        }
    }
}

// module.exports = new FarmerDetails(); 