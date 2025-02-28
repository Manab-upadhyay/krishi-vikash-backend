import connectDB from "./config/db.js";
import express from "express"
import farmerroutes from "./routes/farmer.js"
import croproutes from "./routes/crops.js"
import fertilizersroutes from "./routes/fertilizers.js"
import harvestroutes from "./routes/harvestdetails.js"
import weatherroute from "./routes/weather.js"
import authrouter from "./routes/auth.js"
import { verifyToken } from "./middleware/middleware.js";
const app= express()

app.use(express.json());
connectDB()

app.use("/api/auth", authrouter);

app.use(verifyToken)

app.use("/api/farmers", farmerroutes);
app.use("/api/crops",croproutes)
app.use("/api/fertilizers",fertilizersroutes)
app.use("/api/harvest",harvestroutes)
app.use("/api/weatherDetails",weatherroute)



app.listen(7000, () => console.log(`🚀 Server running on port ${7000}`));