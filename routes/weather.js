import { Router } from "express";
import WeatherController from "../controllers/weather.js";

import express from "express"
const router= express.Router()
const weatherController = new WeatherController();

router.get("/weather/:city", (req, res) => weatherController.getWeather(req, res));

export default router;
