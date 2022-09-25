const express = require('express');
const router = express.Router();

const User = require('../models/user');


router.post('/', async (req, res) => {
    try {
        const {name, email, image} = req.body;
        const oldUser = await User.findOne({email});
        if(oldUser) {
            return res.status(400).send('user already exist.. Please login')
        } else {
            const newUser = new User({
                name,
                email,
                image
            })

            const user = await newUser.save();
            
            res.status(201).json({user});
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

