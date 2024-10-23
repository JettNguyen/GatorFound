import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 4,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        require: true,
        min: 6,
    },
    rawPassword:{
        type: String,
    }
}, {
    timestamps: true
});  

const User = mongoose.model('User', UserSchema);
export default User;

//A2hQrSpgt2avZmbd
