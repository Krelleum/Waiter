const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const jwt = require('jsonwebtoken');

const ItemList = require('../models/itemlistmodel');


// creates new Itemlist
router.post('/createitemlist', (req, res, next) => {
    const newItemList = new ItemList({
        itemlistmongoid: mongoose.Types.ObjectId(),
        itemlistid: 000,
        storeid: req.body.storeid,
        
    });

    newItemList.save()
        .then(result => {
            res.status(201).json(result);
            console.log('Itemlist created succesfully')
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('Itemlist creation failed')
        })

})



router.get('/getitemlist/:itemlistid', (req, res, next) => {
    ItemList.findOne({itemlistmongoid: req.params.itemlistid})
        
        .then(result => {
            
            res.status(200).json(result)
            
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('Could not find Itemlist')
        })
} )


module.exports = router;