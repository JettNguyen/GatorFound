import express from "express";
import Comment from "../models/comment.model.js";

const router = express.Router();

router.post('/', async (req,res) => {
    const post = req.body;
    try{
        const newComment = new Comment(post);
        await newComment.save();
        res.status(201).json({Success: true, data: newComment});
    }
    catch (error){
        console.error("Error in saving comment: ", error.message);
        res.status(500).json({success: false, message: "Server error!"});
    }
});

// Get a list of all posts
router.get('/', async(req, res) => {
    try{
        const comment = await Comment.find({});
        res.status(200).json({success: true, data: comment});
    } catch (error){
        console.log("Error in getting comment: ", error.message);
        res.status(400).json({success: false, message: "Server Error!"});
    }
});

// Get a specific comment
router.get('/:id', async(req, res) => {
    try{
        const comment = await comment.findById(req.params.id);
        if (!comment) return res.status(404).json({success: false, message: "comment not found!"});
        res.status(200).json({success: true, data: comment});
    } catch (error){
        console.log("Error in getting comment: ", error.message);
        res.status(400).json({success: false, message: "Server Error!"});
    }
});

// Update comments
router.put('/:id', async(req, res) => {
    const {id} = req.params;
    const comment = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Information!"});
    }
    try{
        const updatedComment = await comment.findByIdAndUpdate(id, comment, {new: true});
        res.status(200).json({success: true, data: updatedComment});
    } catch (error){
        console.log("Error in updating user: ", error.message);
        res.status(500).json({success: false, message: "Server Error!"});
    }
});

//Delete comment
router.delete('/:id', async(req, res) =>{
    const {id} = req.params;
    try{
        await comment.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "User deleted!"});
    } catch (error){
        console.log("Error in deleting user: ", error.message);
        res.status(404).json({success: false, message: "Cannot find product!"});
    }
});

export default router;