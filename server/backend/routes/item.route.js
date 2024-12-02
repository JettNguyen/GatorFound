import express from "express";
import Item from "../models/item.model.js";
import verifyToken from "../middlewares/auth.js"
// import upload from "./upload_route.js"
import {S3Client} from '@aws-sdk/client-s3';
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from 'dotenv';
import User from "../models/user.model.js";

dotenv.config({path: "../server/.env"});
const router = express.Router();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    });
    console.log("is it this Access Key ID:", process.env.AWS_ACCESS_KEY_ID);  // Debugging step
    console.log("AWS Secret Access Key:", process.env.AWS_SECRET_ACCESS_KEY);  // Debugging step
    console.log("AWS Region:", process.env.AWS_REGION);  // Debugging step


const upload = multer({
    storage: multerS3({
      s3,
      bucket: 'cen3031',
      
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, `uploads/${Date.now().toString()}-${file.originalname}`);
      },
    }),
  });
 
  
// Add new item
router.post('/', upload.single('itemPhoto'), verifyToken, async (req,res) => {
    const { itemName, itemDescription, postType, itemLocation } = req.body;
    const itemPhoto = req.file ? req.file.location : null;
    const userID = req.user.id;
    const user = await User.findById(userID);

    try{
        const newItem = new Item({
            itemName,
            itemDescription, 
            postType,
            itemLocation,
            userID: userID,
            username: user.username,
            itemPhoto,
            comments: [],
        });
        await newItem.save();
        res.status(201).json({Success: true, data: newItem});
    }
    catch (error){
        console.error("Error in saving item: ", error.message);
        res.status(500).json({success: false, message: "Server error!"});
    }
});

// Get a list of all items
router.get('/', verifyToken, async(req, res) => {
    try{
        const userID = req.user.id;
        const item = await Item.find({userID});
        res.status(200).json({success: true, data: item});
    } catch (error){
        console.log("Error in getting item: ", error.message);
        res.status(400).json({success: false, message: "Server Error!"});
    }
});

// Get a specific item
router.get('/all', verifyToken, async(req, res) => {
    try{
        const item = await Item.find();
        if (!item) return res.status(404).json({success: false, message: "Item not found!"});
        res.status(200).json({success: true, data: item});
    } catch (error){
        console.log("Error in getting item: ", error.message);
        res.status(400).json({success: false, message: "Server Error!"});
    }
});

// Update items
router.patch('/:id/flag', async(req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Flag the post by setting isFlagged to true
        item.isFlagged = !item.isFlagged;
        await item.save();

        res.status(200).json({ success: true, message: 'Post flagged successfully' });
    } catch (error) {
        console.error("Error flagging post: ", error);
        res.status(500).json({ success: false, message: 'Error in flagging item' });
    }
});

//Delete item
router.delete('/:id', verifyToken, async(req, res) =>{
    const id = req.params.id;
    const userID = req.user.id;
    const item = await Item.findById(id);
    console.log("USER ID FOR DELETING:", userID);
    if (item.userID != userID) {
        res.status(404).json({success: false, message: "This is not your post!"});
    }
    else {
        try{
            await Item.findByIdAndDelete(id);
            res.status(200).json({success: true, message: "Item deleted!"});
        } catch (error){
            console.log("Error in deleting user: ", error.message);
            res.status(404).json({success: false, message: "Cannot find product!"});
        }
    }   
});

export default router;