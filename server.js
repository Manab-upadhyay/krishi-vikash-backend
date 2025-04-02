import connectDB from "./config/db.js";
import express from "express";
import farmerroutes from "./routes/farmer.js";
import croproutes from "./routes/crops.js";
import fertilizersroutes from "./routes/fertilizers.js";
import harvestroutes from "./routes/harvestdetails.js";
import weatherroute from "./routes/weather.js";
import authrouter from "./routes/auth.js";
import { verifyToken } from "./middleware/middleware.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"

dotenv.config()

const app = express();

app.use(express.json());
connectDB();
app.use(cookieParser())
// ✅ Allow authentication routes **before** verifying token
app.use("/api/auth", authrouter);

// ✅ Now apply verifyToken only for protected routes


app.use("/api/farmers", verifyToken, farmerroutes); // Pass verifyToken as a reference
app.use("/api/crops", croproutes);
app.use("/api/fertilizers", fertilizersroutes);
app.use("/api/harvest", harvestroutes);
app.use("/api/weatherDetails", verifyToken, weatherroute); // Pass verifyToken as a reference

app.listen(7000, () => console.log(`🚀 Server running on port ${7000}`));
