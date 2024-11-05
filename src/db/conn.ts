import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://pemwebP20:PemwebGacor@cluster-p20.w8rtp.mongodb.net/P20?retryWrites=true&w=majority&appName=cluster-P20';

const connectDB = async () => {
  try {
    // Log MONGODB_URI to check if it's loaded
    //console.log("Connecting to MongoDB:", process.env.MONGODB_URI);
    console.log("Connecting to MongoDB:", MONGODB_URI);

    await mongoose.connect(MONGODB_URI as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
