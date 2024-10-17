<<<<<<< Updated upstream
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
=======
import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';

import {connectDB} from "./backend/config/db.js";
import userRoutes from "./backend/routes/user.route.js";
import itemRoutes from "./backend/routes/item.route.js";
import commentRoutes from "./backend/routes/comment.route.js";
>>>>>>> Stashed changes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
<<<<<<< Updated upstream
=======
app.use('/GatorFound', userRoutes);
app.use('/GatorFound/items', itemRoutes);
//app.use('/GatorFound/comments', commentRoutes);
// // Database connection
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('Failed to connect to MongoDB:', err));

>>>>>>> Stashed changes

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Sample route
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
