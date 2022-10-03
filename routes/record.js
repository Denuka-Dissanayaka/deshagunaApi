const express = require('express');
const router = express.Router();

const {getDbConnection} = require('../db');



router.post('/', async(req, res) => {
    try {
        const {record, email} = req.body;
        const db = getDbConnection('desha');
        
        const result = await db.collection(email).insertOne({
            timestamp_property: new Date(),
            record: record
        });
        res.status(201).json({result});
        
    } catch(err) {
            console.log('error');
            console.log(err);
            return res.status(500).json({message: err.message});
            
        
    }
})

router.get('/:email', async(req, res) => {
    try {
        const {email} = req.params;
        const db = getDbConnection('desha');
        const records = await db.collection(email).find({}).toArray();
        
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
        const db = getDbConnection('desha');
        
        const record = await db.collection(email).drop();
        await db.collection('users').deleteOne({email})
       
        

        if (!record) {
            return res.status(404).json({message:'records not found'});
        }
        res.status(200).send({ message: "records were deleted" });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;



