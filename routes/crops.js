
import Crops from "../controllers/crops.js";
import express from "express"

const router= express.Router()
const cropcontroller= new Crops

router.post("/add-crops", (req, res) => cropcontroller.SaveCrops(req, res));
router.get("/get-crops",(req,res)=>cropcontroller.getcrops(req,res))
export default router

