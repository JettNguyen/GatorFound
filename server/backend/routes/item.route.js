import express from "express";
import Item from "../models/item.model.js";

const router = express.Router();

// Add new item
router.post('/', async (req,res) => {
    const item = req.body;
    try{
        const newItem = new Item(item);
        await newItem.save();
        res.status(201).json({Success: true, data: newItem});
    }
    catch (error){
        console.error("Error in saving item: ", error.message);
        res.status(500).json({success: false, message: "Server error!"});
    }
});

// Get a list of all items
router.get('/', async(req, res) => {
    try{
        const item = await Item.find({});
        res.status(200).json({success: true, data: item});
    } catch (error){
        console.log("Error in getting item: ", error.message);
        res.status(400).json({success: false, message: "Server Error!"});
    }
});

// Get a specific item
router.get('/:id', async(req, res) => {
    try{
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({success: false, message: "Item not found!"});
        res.status(200).json({success: true, data: item});
    } catch (error){
        console.log("Error in getting item: ", error.message);
        res.status(400).json({success: false, message: "Server Error!"});
    }
});

// Update items
router.put('/:id', async(req, res) => {
    const {id} = req.params;
    const item = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Information!"});
    }
    try{
        const updatedItem = await Item.findByIdAndUpdate(id, item, {new: true});
        res.status(200).json({success: true, data: updatedItem});
    } catch (error){
        console.log("Error in updating user: ", error.message);
        res.status(500).json({success: false, message: "Server Error!"});
    }
});

//Delete item
router.delete('/:id', async(req, res) =>{
    const {id} = req.params;
    try{
        await Item.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "User deleted!"});
    } catch (error){
        console.log("Error in deleting user: ", error.message);
        res.status(404).json({success: false, message: "Cannot find product!"});
    }
});

export default router;