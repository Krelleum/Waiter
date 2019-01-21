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

router.get('/getorderbyuser/:userid', (req, res, next) => {
    OrderArchive.find({userid: req.params.userid})
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json(result);
        
    })
    .catch(err => {
        res.status(500).json(err);
    })
    
})


// Get last 200 Order Items by Store ID

router.get('/getlastorders/:storeid', (req, res, next) => {
    OrderArchive.find({storeid: req.params.storeid})
    .limit(250)
    .then(result => {
        res.status(200).json(result);
        console.log('last 250 Orders found by Store ID')
    })
    .catch(err => {
        res.status(500).json(err)
        console.log('error while getting last 250 Order Items by Store ID')
    })
})



// Get Orders By Date

router.get('/getordersbydate/:storeid/:startdate/:enddate/', (req, res, next) => {
    console.log(req.params.startdate)
    console.log(req.params.enddate)
    OrderArchive.find(
        {storeid: req.params.storeid,
         timecreated: 
             { $gte: new Date(req.params.startdate), $lte: new Date(req.params.enddate) }})
    .then(result => {
        res.status(200).json(result);
        
        console.log('found orders by date')
    })
    .catch(err => {
        res.status(500).json(err);
        console.log('could not find orders by date')
    })
})




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