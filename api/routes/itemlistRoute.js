const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const jwt = require('jsonwebtoken');

const ItemList = require('../models/itemlistmodel');



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



module.exports = router;