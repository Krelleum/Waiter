const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const jwt = require('jsonwebtoken');

const Store = require('../models/storeModel');



router.post('/createstore', (req, res, next) => {
    const newStore = new Store({
        storemongoid: new mongoose.Types.ObjectId(),
        storeid: req.body.storeid,
        storeemail: req.body.storeemail,
        storepassword: req.body.storepassword,
        tables: req.body.tables,
        itemlistid: req.body.itemlistid,
        
    });

    newStore.save()
        .then(result => {
            res.status(201).json(result);
            console.log('Store created succesfully')
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('Store creation failed')
        })

})




router.get('/getstore/:storeid', (req, res, next) => {
   console.log('request received')
   Store.findOne({ storeid: req.params.storeid} )
        .then(result => {
            res.status(200).json(result)
            console.log('Store was found by id')
        })
        .catch(err => {
            res.status(500).json(err)
            console.log('failed to get Store by id')
        })
})




// Create a GuestToken
router.post('/gettoken', (req, res, next) =>{
    var token = jwt.sign({ userid: req.body.userid, storeid: req.body.storeid, tableid: req.body.storeid }, 'waiter', { expiresIn: '3h' })
    res.status(200).json({ message: 'Token signed', token: token});
    console.log('****************NEW USER - Token signed***********************');
})




module.exports = router;