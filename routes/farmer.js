
import FarmerDetails from "../controllers/farmerDetails.js";
import express from "express"

const router= express.Router()
const farmercontroller= new FarmerDetails

router.post("/add-farmer", (req, res) => farmercontroller.SaveDetails(req, res));
router.get("/get-farmer", (req, res) => farmercontroller.GetFarmers(req, res));

export default router

