import mongoose from "mongoose";

// const mongoURI = process.env.MONGODB_URI;

const connectDB = async() => {
  try {

    if (!process.env.MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables"
      );
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Mongodb connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;