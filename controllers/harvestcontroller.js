import { PreHarvest,PostHarvest,Crop,PostHarvestMarket,PostHarvestProcessing } from "../models/schema.js";

export default class HarvestController {
    

    async savePreHarvest(req, res) {
        try {
            const preHarvest = new PreHarvest(req.body);
            await preHarvest.save();
            res.status(201).json({ message: "✅ Pre-Harvest details saved successfully", preHarvest });
        } catch (error) {
            console.error(" Error saving Pre-Harvest details:", error);
            res.status(500).json({ error: "Failed to save Pre-Harvest details" });
        }
    }


    async savePostHarvest(req, res) {
        try {
            const postHarvest = new PostHarvest(req.body);
            await postHarvest.save();
            res.status(201).json({ message: "✅ Post-Harvest details saved successfully", postHarvest });
        } catch (error) {
            console.error(" Error saving Post-Harvest details:", error);
            res.status(500).json({ error: "Failed to save Post-Harvest details" });
        }
    }

    // Get All Pre-Harvest Details
    async getPreHarvest(req, res) {
        try {
            let { cropName } = req.query;
    
            console.log("🔍 Searching for Crop Name:", cropName);
    
            // Find crop by name
            const crop = await Crop.findOne({ name: cropName });
    
            if (!crop) {
                console.log(" Crop not found in DB");
                return res.status(404).json({ error: "Crop not found" });
            }
    
            console.log(" Found Crop:", crop);
    
            // Fetch pre-harvest data linked to this crop
            const preHarvests = await PreHarvest.find({ crop: crop._id.toString() })  // Use correct field name
            .populate("crop") // Ensure lowercase matches schema
            .populate("fertilizer");

    
            console.log("📊 Found Pre-Harvest Data:", preHarvests);
    
            if (!preHarvests.length) {
                return res.status(404).json({ error: "No Pre-Harvest data found" });
            }
    
            res.status(200).json({ message: "Pre-Harvest details fetched successfully", preHarvests });
        } catch (error) {
            console.error(" Error fetching Pre-Harvest details:", error);
            res.status(500).json({ error: "Failed to fetch Pre-Harvest details" });
        }
    }

    // Get All Post-Harvest Details (with Crop)
    async getPostHarvest(req, res) {
        try {
            let { cropId, cropName } = req.query;
           

           
                const crop = await Crop.findOne({ name: cropName });
                if (!crop) return res.status(404).json({ error: "Crop not found" });
              
           

            const postHarvests = await PostHarvest.find({crop:crop._id.toString()})

            res.status(200).json({ message: " Post-Harvest details fetched successfully", postHarvests });
        } catch (error) {
            console.error(" Error fetching Post-Harvest details:", error);
            res.status(500).json({ error: "Failed to fetch Post-Harvest details" });
        }
    }
    async addPostHarvestMarket(req, res) {
        try {
            const { post_harvest, market_name, market_price } = req.body;

            // Check if post_harvest ID exists
            const postHarvest = await PostHarvest.findById(post_harvest);
            if (!postHarvest) {
                return res.status(404).json({ error: "Post-Harvest data not found" });
            }

            const newMarketData = new PostHarvestMarket({
                post_harvest,
                market_name,
                market_price
            });

            await newMarketData.save();
            res.status(201).json({ message: "✅ Market data added successfully", data: newMarketData });

        } catch (error) {
            console.error(" Error adding market data:", error);
            res.status(500).json({ error: "Failed to add market data" });
        }
    }

    // ✅ GET: Fetch Post-Harvest Market Data by Post-Harvest ID
    


    async addPostHarvestProcessing(req, res) {
        try {
            const { post_harvest, storage_guidelines, subsidy_provider, processing_facilities } = req.body;

            // Check if post_harvest ID exists
            // const crop = await PostHarvest.findById(post_harvest);
            // if (!postHarvest) {
            //     return res.status(404).json({ error: "Post-Harvest data not found" });
            // }

            const newProcessingData = new PostHarvestProcessing({
                post_harvest,
                storage_guidelines,
                subsidy_provider,
                processing_facilities
            });

            await newProcessingData.save();
            res.status(201).json({ message: " Processing data added successfully", data: newProcessingData });

        } catch (error) {
            console.error(" Error adding processing data:", error);
            res.status(500).json({ error: "Failed to add processing data" });
        }
    }

  
async getPostHarvestMarket(req, res) {
    try {
        const { cropName } = req.query;

        // 🔍 Step 1: Find the Crop by Name
        const crop = await Crop.findOne({ name: { $regex: cropName, $options: "i" } });

        if (!crop) {
            return res.status(404).json({ error: "❌ No crop found with this name" });
        }

        // Get Crop ID
        const cropId = crop._id;

        // 🔍 Step 2: Find Post-Harvest Data linked to Crop ID
        const postHarvest = await PostHarvest.findOne({ crop: cropId.toHexString() });

        if (!postHarvest) {
            return res.status(404).json({ error: "❌ No post-harvest data found for this crop" });
        }

        // Get Post-Harvest ID
        const postHarvestId = postHarvest._id;

        // 🔍 Step 3: Fetch Market Data related to Post-Harvest ID
        const marketData = await PostHarvestMarket.find({ post_harvest: postHarvestId.toString() });

        if (!marketData.length) {
            return res.status(404).json({ error: "❌ No market data found for this crop" });
        }

        res.status(200).json({
            message: "✅ Market data fetched successfully",
            marketData
        });

    } catch (error) {
        console.error("❌ Error fetching market data:", error);
        res.status(500).json({ error: "Failed to fetch market data" });
    }
}


async getPostHarvestProcessing(req, res) {
    try {
        const { cropName} = req.query;

        // 🔍 Step 1: Find the Crop by Name
        const crop = await Crop.findOne({ name: { $regex: cropName, $options: "i" } });

        if (!crop) {
            return res.status(404).json({ error: "❌ No crop found with this name" });
        }

        // Get Crop ID
        const cropId = crop._id;

        // 🔍 Step 2: Find Post-Harvest Data linked to Crop ID
        const postHarvest = await PostHarvestProcessing.findOne({ crop: cropId.toString() });

        if (!postHarvest) {
            return res.status(404).json({ error: "❌ No post-harvest data found for this crop" });
        }

        // Get Post-Harvest ID
        // const postHarvestId = postHarvest._id;

        // // 🔍 Step 3: Fetch Processing Data related to Post-Harvest ID
        // const processingData = await PostHarvestProcessing.find({ post_harvest: postHarvestId.toString() });

        if (!processingData.length) {
            return res.status(404).json({ error: "❌ No processing data found for this crop" });
        }

        res.status(200).json({
            message: "✅ Processing data fetched successfully",
          postHarvest
        });

    } catch (error) {
        console.error("❌ Error fetching processing data:", error);
        res.status(500).json({ error: "Failed to fetch processing data" });
    }
}

}
