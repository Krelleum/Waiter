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


// Get order by User id
router.get('/getorder/:userid', (req, res ,next ) => {
    Order.find({userid: req.params.userid})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
        console.log('error')
    })
})


// Get order by Store id

router.get('/getorderbystore/:storeid', (req, res, next) => {
    Order.find({ storeid: req.params.storeid })
        .sort({ datefield: 1 })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
            console.log('error')
        })
})


// Gets order by Store and Table id

router.get('/getorderbytable/:storeid/:tableid', (req, res, next) => {
    Order.find({storeid: req.params.storeid, tableid: req.params.tableid})
    .then(result => {
       
        res.status(200).json(result)
        
    })
    .catch(err =>{
        res.status(500).json(err)
        console.log('error')
    })
})


router.patch('/requestpayment/:userid', (req, res, next) => {
    Order.updateMany({userid: req.params.userid}, {$set: {status : 'awaitpayment'}})
    .then(result => {
        res.status(200).json(result)
        console.log('Orderstatus set to // awaitpayment')
    })
    .catch(err =>{
        res.status(500).json(err);
        console.log('Orderstatus could not be changed')
    }) 
})







module.exports = router;

