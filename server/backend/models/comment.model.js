import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    itemID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Item',
    },
    comments: {
        type: String,
        require: true,
    },
}, {
    timestamps: true
});  

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;

//A2hQrSpgt2avZmbd
