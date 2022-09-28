const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const {User, userShema} = require('../models/user')
const Record = require('../models/record');


router.post('/', async(req, res) => {
    try {
        const {record, email, name, image} = req.body;
        
        // check user
        const user = await User.findOne({email});
        if(!user) {
            const newUser = new User({email, name, image})
            await newUser.save();

            //create time series collection
            const recordModel = mongoose.model(email, userShema, email);
        }

        const client = new MongoClient(process.env.DATABASE_URL);
        await client.connect();
        const db = client.db('desha');
        const collection = db.collection(email);
        const insertResult = await collection.insertOne({
            timestamp_property: new Date(),
            records: record
        });
        //console.log(insertResult)
        client.close();

       
            
        res.status(201).json('save record');
        
    } catch(err) {
            console.log('error');
            console.log(err);
            return res.status(500).json({message: err.message});
            
        
    }
})

router.get('/:email', async(req, res) => {
    try {
        const {email} = req.params;
        //console.log(email);
        const client = new MongoClient(process.env.DATABASE_URL);
        await client.connect();
        const db = client.db('desha');
        const records = await db.collection(email).find({}).toArray();
        
        //console.log(records)
        client.close();
        res.status(200).json({records});
 
    } catch(err) {
            console.log('error');
            console.log(err);
            return res.status(500).json({message: err.message});
            
        
    }
})

router.delete("/:email", async (req, res) => {
    try {
        const {email} = req.params;
        const client = new MongoClient(process.env.DATABASE_URL);
        await client.connect();
        const db = client.db('desha');
        const record = await db.collection(email).drop();
        
       
        client.close();
        await User.findOneAndDelete({email});

        if (!record) {
            return res.status(404).json({message:'records not found'});
        }
        res.status(200).send({ message: "records were deleted" });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;



