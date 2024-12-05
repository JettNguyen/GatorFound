import express from "express";
import Comment from "../models/comment.model.js";
import Item from "../models/item.model.js";
import verifyToken from "../middlewares/auth.js";
import User from "../models/user.model.js";

const router = express.Router();
//Add new comment route
router.post('/:itemId/comments', verifyToken, async (req,res) => {
    const userID = req.user.id;
    const {comment} = req.body;
    const itemId = req.params.itemId;
    try{
        const item = await Item.findById(itemId);
        const user = await User.findById(userID);
        const username = user.username;
        if (!item)  res.status(404).json({message: "Item not found!"});
        
        const newComment = new Comment({
            comment,
            username,
            comments: [],
        });
        await newComment.save();
        item.comments.push(newComment._id);
        await item.save();
       
        res.status(201).json({Success: true, data: {id: newComment._id, comment: newComment.comment, username: newComment.username,},});
    }
    catch (error){
        console.error("Error in saving comment: ", error.message);
        res.status(500).json({success: false, message: "Server error!"});
    }
});
// Post new replies
router.post('/:commentId/replies', verifyToken, async (req,res) => {
    const userID = req.user.id;
    const {reply} = req.body;

    try{
        const user = await User.findById(userID);
        const username = user.username;
        const comment = await Comment.findById(req.params.commentId);
        if (!comment)  res.status(404).json({message: "Item not found!"});
        
        const timestamp = new Date();
        const newReply = {reply, username, timestamp};
        comment.comments.push(newReply);
        await comment.save();
        res.status(201).json({
            success: true,
            data: {
                id: comment.comments[comment.comments.length - 1]._id,
                reply: newReply.reply,
                username: newReply.username,
            },
        });
    }
    catch (error){
        console.error("Error in saving comment: ", error.message);
        res.status(500).json({success: false, message: "Server error!"});
    }
});

// Get a list of all comments of the post
router.get('/:itemId/comments', verifyToken, async(req, res) => {
    const itemId = req.params.itemId;
    try{
        const item = await Item.findById(itemId).populate('comments', 'comment username');
        if (!item) return res.status(404).json({message: "Item not found!"});
        const commentTexts = item.comments.map(com => ({
            id: com._id,
            comment: com.comment,
            username: com.username,
        }));
        res.status(200).json({success: true, data: commentTexts});
    } catch (error){
        console.log("Error in getting comment: ", error.message);
        res.status(400).json({success: false, message: "Server Error!"});
    }
});

// Get a list of all replies of the comment
router.get('/:commentId/replies', verifyToken, async(req, res) => {
    const commentId = req.params.commentId;
    try{
        const comment = await Comment.findById(commentId).populate('comments', 'reply username');
        if (!comment) return res.status(404).json({message: "Item not found!"});
        const replyText = comment.comments.map(rep => ({
            id: rep.id,
            reply: rep.reply,
            username: rep.username,
        }));
        res.status(200).json({success: true, data: replyText});
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