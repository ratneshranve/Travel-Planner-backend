import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables



mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("✅ MongoDB Atlas connected"))
.catch(err => console.error("❌ MongoDB connection failed:", err));
