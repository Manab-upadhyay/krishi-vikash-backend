import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
    name: String,
    phone_number: String,
    email: String,
    password:String,
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    preferred_language: String,
    age: Number,
    gender: String,
    farm_size: Number,
    farming_type: String,
    experience_years: Number,
    education_level: String,
    registration_date: Date,
    status: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const locationSchema = new mongoose.Schema({
    country: String,
    state: String,
    district: String,
    block: String,
    village: String,
    latitude: Number,
    longitude: Number,
    climate_zone: String,
    soil_type: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const cropSchema = new mongoose.Schema({
    name: String,
    type: String,
    season: String,
    average_yield: Number,
    water_requirement: Number,
    temperature_range: String,
    soil_type: String,
    growth_duration: Number,
    market_demand: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const fertilizerSchema = new mongoose.Schema({
    name: String,
    type: String,
    source: String,
    usage_guidelines: String,
    nutrients: String,
    availability: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const preHarvestSchema = new mongoose.Schema({
    crop: { type: mongoose.Schema.Types.ObjectId, ref: "Crop" },
    source: String,
    seed_quality: String,
    fertilizer: { type: mongoose.Schema.Types.ObjectId, ref: "Fertilizer" },
    finance_source: String,
    insurance_provider: String,
    pest_control_measures: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const postHarvestSchema = new mongoose.Schema({
    crop: { type: mongoose.Schema.Types.ObjectId, ref: "Crop" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const postHarvestMarketSchema = new mongoose.Schema({
    post_harvest: { type: mongoose.Schema.Types.ObjectId, ref: "PostHarvest" },
    market_name: String,
    market_price: Number,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const postHarvestProcessingSchema = new mongoose.Schema({
    post_harvest: { type: mongoose.Schema.Types.ObjectId, ref: "PostHarvest" },
    storage_guidelines: String,
    subsidy_provider: String,
    processing_facilities: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    phone: String,
    status: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const weatherDataSchema = new mongoose.Schema({
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    temperature: Number,
    rainfall: Number,
    humidity: Number,
    wind_speed: Number,
    weather_condition: String,
    forecast_date: Date,
    created_at: { type: Date, default: Date.now }
});

const techSupportSchema = new mongoose.Schema({
    warning_type: String,
    description: String,
    severity_level: String,
    advisory: String,
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    created_at: { type: Date, default: Date.now }
});

const notificationSchema = new mongoose.Schema({
    title: String,
    message: String,
    target_audience: String,
    attachment_url: String,
    notification_type: String,
    created_at: { type: Date, default: Date.now }
});

export const Farmer = mongoose.model("Farmer", farmerSchema);
export const Crop = mongoose.model("Crop", cropSchema);
export const Location = mongoose.model("Location", locationSchema);
export const Fertilizer = mongoose.model("Fertilizer", fertilizerSchema);
export const PreHarvest = mongoose.model("PreHarvest", preHarvestSchema);
export const PostHarvest = mongoose.model("PostHarvest", postHarvestSchema);
export const PostHarvestMarket = mongoose.model("PostHarvestMarket", postHarvestMarketSchema);
export const PostHarvestProcessing = mongoose.model("PostHarvestProcessing", postHarvestProcessingSchema);
export const Admin = mongoose.model("Admin", adminSchema);
export const WeatherData = mongoose.model("WeatherData", weatherDataSchema);
export const TechSupport = mongoose.model("TechSupport", techSupportSchema);
export const Notification = mongoose.model("Notification", notificationSchema);
