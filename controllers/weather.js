import axios from "axios";




 // Store API Key in .env
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export default class WeatherController {
    // Fetch weather details for a given city
    async getWeather(req, res) {
        try {
            const { city } = req.params; // Get city from request params
            if (!city) {
                return res.status(400).json({ error: "City name is required" });
            }

            const response = await axios.get(`${BASE_URL}`, {
                params: {
                    q: city,
                    appid: "b92284d08176211ed7133bd2a2f4a111",
                    units: "metric" // Get temperature in Celsius
                }
            });

            res.status(200).json({
                message: "✅ Weather data fetched successfully",
                data: response.data
            });

        } catch (error) {
            console.error("❌ Error fetching weather data:", error.message);
            res.status(500).json({ error: "Failed to fetch weather data" });
        }
    }
}
