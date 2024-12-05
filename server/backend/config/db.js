import mongoose from "mongoose";
// Connect to database
export const connectDB = async() => {
    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is not defined');
        process.exit(1);
    }
    
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}