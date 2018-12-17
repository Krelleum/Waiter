const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const jwt = require('jsonwebtoken');

const Order = require('../models/orderModel');



router.post('/createorder', (req, res, next) => {
    console.log('Request received');

    const newOrder = new Order({
        orderid: new mongoose.Types.ObjectId(),
        userid: req.body.userid,
        storeid: req.body.storeid,
        tableid: req.body.tableid,
        itemname: req.body.itemname,
        itemprice: req.body.itemprice,
        status: req.body.status,
    });

    newOrder.save()
        .then(result => {
            res.status(201).json(result);
            console.log('Order created succesfully')
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('Order creation failed')
        })




})


module.exports = router;

