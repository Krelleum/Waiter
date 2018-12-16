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




// Create a GuestToken





module.exports = router;