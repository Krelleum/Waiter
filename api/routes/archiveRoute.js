const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const OrderArchive = require('../models/orderarchiveModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');




// SEND ORDER TO ARCHIVE

router.post('/sendtoarchive', (req, res, next) => {
    const newArchiveOrder = new OrderArchive({
        orderid: req.body.orderid,
        userid: req.body.userid,
        storeid: req.body.storeid,
        tableid: req.body.tableid,
        itemname: req.body.itemname,
        itemprice: req.body.itemprice,
        status: 'payed',
    });

    newArchiveOrder.save()
        .then(result => {
            res.status(201).json(result);
            console.log('Archive Order created succesfully')
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('Archive Order creation failed')
        })


} )



// Remove Order ID from User Account OrderID ARRAY

router.patch('/removeuserorder',  (req, res, next) => {
    User.findOneAndUpdate({usermongoid: req.body.userid}, {$pull: {orderid: req.body.orderid}})
   
    .then(result => {
        res.status(200).json(result);
        console.log('Order was removed from User Account');

        
    })
    .catch(err => {
        res.status(500).json(err);
        console.log('Could not remove Order from User Account');
    })
})





// Deletes Order 

router.patch('/deleteorder', (req, res, next) => {
    Order.findOneAndRemove({ orderid: req.body.orderid })
        .exec()
        .then(result => {
            res.status(200).json(result);
            console.log('Order was deleted!')
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('Could not delete Order!')
        })
})







module.exports = router;