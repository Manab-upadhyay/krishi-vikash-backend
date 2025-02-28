
import HarvestController from "../controllers/harvestcontroller.js";
import express from "express"
const router= express.Router()
const harvestController = new HarvestController();


router.post("/pre-harvest", (req, res) => harvestController.savePreHarvest(req, res));

router.post("/post-harvest", (req, res) => harvestController.savePostHarvest(req, res));
router.post("/post-harvestMarket", (req, res) => harvestController.addPostHarvestMarket(req, res));


router.post("/post-harvestProcessing", (req, res) => harvestController.addPostHarvestProcessing(req, res));


router.get("/pre-harvest", (req, res) => harvestController.getPreHarvest(req, res));


router.get("/post-harvest", (req, res) => harvestController.getPostHarvest(req, res));
router.get("/post-harvestProcessing", (req, res) => harvestController.getPostHarvestProcessing(req, res));


router.get("/post-harvestMarket", (req, res) => harvestController.getPostHarvestMarket(req, res));

export default router;
