
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://manabupadhyay123:asZcONUFFbUbULPG@cluster0.5rzi8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error(" MongoDB Connection Failed:", error);
    process.exit(1); // Stop the app if connection fails
  }
};

export default connectDB
