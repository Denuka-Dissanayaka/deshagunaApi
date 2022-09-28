const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");


const {userShema, User} = require('../models/user');


router.post('/', async (req, res) => {
    try {
        
        const {name, email, image} = req.body;
        // check user already exist
        const userExist = await User.findOne({email});
        if(userExist) {
            return res.status(400).send('user already exist.. Please login')
        } else {
            const newUser = new User({email, name, image})
            const user = await newUser.save();

            // create time series collection
            const recordModel = mongoose.model(email, userShema, email);
            
            res.json({user});
        }
        
        
    

    } catch(err) {
            console.log('error');
            console.log(err);
            return res.status(500).json({message: err.message});
            
        
    }
})

router.get('/', async (req, res) => {
    try {
        
        const users = await User.find();
        if(!users) {
            return res.status(400).send('No users')
        } else {
            
            
            res.status(201).json({users});
        }
    } catch(err) {
            console.log('error');
            console.log(err);
            return res.status(500).json({message: err.message});
            
        
    }
})


module.exports = router;

