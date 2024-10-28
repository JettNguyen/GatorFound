import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    category: {
        type: String,
        max: 50,
    },
    description: {
        type: String,
        required: true,
        min: 0,
        max: 200,
    },
    status: {
        type: Boolean,
        required: true,
        default: false,   // false = lost, true = found
    },
    location: {
        type: String,  // Text or image
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    photoUrl: {
        type: String,   // URL to image
    },
}, {
    timestamps: true
});  

const Item = mongoose.model('Item', ItemSchema);
export default Item;

//A2hQrSpgt2avZmbd
