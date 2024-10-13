const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@ufl\.edu$/, 'Please use a UF email'], // Restrict to UF emails
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
    },
});

// Encrypt password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
