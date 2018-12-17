const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const jwt = require('jsonwebtoken');

const User = require('../models/userModel');



router.post('/createuser', (req, res, next) => {
    console.log('Request received');
    
    const newUser = new User({
        usermongoid: new mongoose.Types.ObjectId(),
    });

    newUser.save()
        .then(result => {
            res.status(201).json(result);
            console.log('User created succesfully')
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('User creation failed')
        })
    
})

router.patch('/addordertouser', (req, res, next) => {
    console.log(req.body.itemprice)
    User.findOneAndUpdate({ usermongoid: req.body.userid }, {$push:{'orderid': req.body.orderid}}, {$add: {'total': req.body.itemprice}})
        .then(result => {
            res.status(200).json(result);
            console.log('Order Added to User');
        })
        .catch(err => {
            console.log(err);
            console.log('Unable to add Order to User')
        })
})




// Create a GuestToken





module.exports = router;