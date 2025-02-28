import { Router } from "express";
import FertilizerController from "../controllers/fertilizers.js";
import express from "express"
const router= express.Router()
const fertilizerController = new FertilizerController();

router.post("/add-fertilizer", (req, res) => fertilizerController.SaveDetails(req, res));
router.get("/get-fertilizers", (req, res) => fertilizerController.GetFertilizers(req, res));

export default router;
