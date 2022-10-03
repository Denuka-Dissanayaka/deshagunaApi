const express = require('express');
const router = express.Router();
const {getDbConnection} = require('../db');



router.post('/', async (req, res) => {
    try {
        
        const {name, email, image} = req.body;
        const db = getDbConnection('desha');
        // check user already exist
        const user = await db.collection('users').findOne({email});
        if(user) {
            
            return res.sendStatus(409);
        } else {
            db.createCollection(email, {
                timeseries: {
                    timeField: 'timestamp_property',
                    granularity: 'minutes',
                  }
            })

            const result = await db.collection('users').insertOne({
                email,
                name,
                image
            })
            
            res.json({result});  
        }
        
        
    

    } catch(err) {
            console.log('error');
            console.log(err);
            return res.status(500).json({message: err.message});
            
        
    }
})

router.get('/', async (req, res) => {
    try {
        const db = getDbConnection('desha');
        const users = await db.collection('users').find({}).toArray();
        
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

