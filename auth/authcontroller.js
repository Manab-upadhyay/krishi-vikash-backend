import { GenerateJwtToken } from "../jwt/generate.token.js";
import { Farmer } from "../models/schema.js";
import bcrypt from "bcrypt"
export default class auth{
   async  Singup(req, res) {
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
       
             
               const existingFarmer = await Farmer.findOne({ $or: [{ email }, { phone_number }] });
               if (existingFarmer) {
                   return res.status(400).json({ error: "Farmer already registered with this email or phone number" });
               }
       
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
        async  loginFarmer(req, res) {
            try {
                const { email, password } = req.body;
        
                // Check if farmer exists
                const farmer = await Farmer.findOne({ email });
                if (!farmer) return res.status(400).json({ error: "Invalid email or password" });
        
                // Compare password
                const isMatch =  bcrypt.compare(password, farmer.password);
                if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });
        
              
                const token = GenerateJwtToken(farmer);
        
                
               
        
                res.json({ message: "Login successful", token });
            } catch (error) {
                res.status(500).json({ error: "Login failed" });
            }
        }
    
    async Logout(){
        res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
        res.json({ message: "Logged out successfully" });
    }
}