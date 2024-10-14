import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';

import {connectDB} from "./backend/config/db.js";
import userRoutes from "./backend/routes/user.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/GatorFound', userRoutes);
// // Database connection
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('Failed to connect to MongoDB:', err));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
