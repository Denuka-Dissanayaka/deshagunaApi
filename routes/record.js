const express = require('express');
const router = express.Router();

const Record = require('../models/record');

router.post('/', async(req, res) => {
    try {
        const {record, email} = req.body;
        
        const newRecord = new Record({
            record,
            email
            
        })

        const recordSave = await newRecord.save();
            
        res.status(201).json({record:recordSave});
        
    } catch(err) {
            console.log('error');
            console.log(err);
            return res.status(500).json({message: err.message});
            
        
    }
})

router.get('/:email', async(req, res) => {
    try {
        const {email} = req.params;
        console.log(email);
    const records = await Record.find({email});
        console.log(records);   
        res.status(200).json({records});
        
    } catch(err) {
            console.log('error');
            console.log(err);
            return res.status(500).json({message: err.message});
            
        
    }
})

router.delete("/:id/:email", async (req, res) => {
    try {
        const {id, email} = req.params;
        
        const record = await Record.findOneAndDelete({ _id: id, email });

        if (!record) {
            return res.status(404).json({message:'note not found'});
        }
        res.status(200).send({ message: "Note was deleted" });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;