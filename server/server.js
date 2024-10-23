import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';

import {connectDB} from "./backend/config/db.js";
import userRoutes from "./backend/routes/user.route.js";
import itemRoutes from "./backend/routes/item.route.js";
import commentRoutes from "./backend/routes/comment.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/GatorFound', userRoutes);
app.use('/GatorFound/items', itemRoutes);
app.use('/GatorFound/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});