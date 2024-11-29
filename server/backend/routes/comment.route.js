import express from "express";
import Comment from "../models/comment.model.js";
import Item from "../models/item.model.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.post('/:itemId/comments', verifyToken, async (req,res) => {
    const userID = req.user.id;
    const {comment} = req.body;
    const itemId = req.params.itemId;
    try{
        const item = await Item.findById(itemId);
        if (!item)  res.status(404).json({message: "Item not found!"});
        
        const newComment = new Comment({
            comment,
            userID,
            comments: [],
        });
        await newComment.save();
        item.comments.push(newComment._id);
        await item.save();
       
        res.status(201).json({Success: true, data: {id: newComment._id, comment: newComment.comment,},});
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
        const comment = await Comment.findById(req.params.commentId);
        if (!comment)  res.status(404).json({message: "Item not found!"});
        
        const timestamp = new Date();
        const newReply = {reply, userID, timestamp};
        comment.comments.push(newReply);
        await comment.save();
        res.status(201).json({
            success: true,
            data: {
                id: comment.comments[comment.comments.length - 1]._id,
                reply: newReply.reply,
                 
            },
        });
    }
    catch (error){
        console.error("Error in saving comment: ", error.message);
        res.status(500).json({success: false, message: "Server error!"});
    }
});

// Get a list of all posts
router.get('/:itemId/comments', verifyToken, async(req, res) => {
    const itemId = req.params.itemId;
    try{
        const item = await Item.findById(itemId).populate('comments', 'comment');
        if (!item) return res.status(404).json({message: "Item not found!"});
        const commentTexts = item.comments.map(com => ({
            id: com._id,
            comment: com.comment
        }));
        res.status(200).json({success: true, data: commentTexts});
    } catch (error){
        console.log("Error in getting comment: ", error.message);
        res.status(400).json({success: false, message: "Server Error!"});
    }
});

// Get a list of all posts
router.get('/:commentId/replies', verifyToken, async(req, res) => {
    const commentId = req.params.commentId;
    try{
        const comment = await Comment.findById(commentId).populate('comments', 'reply');
        if (!comment) return res.status(404).json({message: "Item not found!"});
        const replyText = comment.comments.map(rep => ({
            id: rep.id,
            reply: rep.reply
        }));
        res.status(200).json({success: true, data: replyText});
    } catch (error){
        console.log("Error in getting comment: ", error.message);
        res.status(400).json({success: false, message: "Server Error!"});
    }
});

// Get a specific reply
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