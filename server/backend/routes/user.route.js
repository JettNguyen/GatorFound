
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import mongoose from "mongoose";

const router = express.Router();


// Register
router.post('/register', async (req, res) =>{
    const {username, email, password} = req.body;
    //Validate conditions
    if (!username || !email || !password){
        return res.status(400).json({success: false, message: 'Please provide all required fields!'});
    }

    const allowedDomain = "@ufl.edu";
    if (!email.endsWith(allowedDomain)){
        return res.status(400).json({success: false, message: "Email must be a gatorlink email!"});
    }

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            rawPassword: password,
        });

        //Save user
        const user = await newUser.save();
        res.status(201).json(user);
    }
    catch (error){
        console.error("Error in Create User: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

// Login
router.post('/login', async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(404).json({message: "User not found!"});

        // Check password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400). json("Wrong password!");

        // JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username},
            process.env.JWT_SECRET,
            {expiresIn: "1h"} 
        );

        res.status(200).json({token});
    }
    catch (error){
        res.status(500).json({message: "Login timed out"});
    }
});
// Get user information
router.get('/', async(req, res) => {
    try{
        const user = await User.find({});
        res.status(200).json({success: true, data: user});
    } catch (error){
        console.log("Error in getting user: ", error.message);
        res.status(400).json({success: false, message: "Server Error!"});
    }
});


export default router;