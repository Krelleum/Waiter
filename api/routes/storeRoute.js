const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const jwt = require('jsonwebtoken');

const Store = require('../models/storeModel');



// Create a GuestToken
router.post('/gettoken', (req, res, next) => {
    var token = jwt.sign({ userid: req.body.userid, storeid: req.body.storeid, tableid: req.body.tableid }, 'waiter', { expiresIn: '3h' })
    res.status(200).json({ message: 'Token signed', token: token });
    console.log('****************NEW USER - Token signed***********************');
})


// Check Login information and create a StoreToken

router.post('/getstoretoken', (req, res, next) => {
    
    var storeid = req.body.storeid;
    var useremail =  req.body.useremail;
    var userpassword = req.body.userpassword;

   

    if(storeid && useremail && userpassword){
    
    Store.findOne({storeid: req.body.storeid})
    
    .then(result => {
        
        console.log(result.storeemail)
        if (result.storeemail === req.body.useremail && result.storepassword === req.body.userpassword){
            
            var token = jwt.sign({storeid, useremail}, 'waiter', {expiresIn: '3h'})

            res.status(200).json({message: 'Store Token signed', token: token})
            console.log('****************Store Login - Token signed***********************');
        }
        else{
            res.status(401).json('Unauthorized')
            console.log('***************UNAUTHORIZED TO LOGIN STORE ACCOUNT');
        }
    })
    .catch(err => {
        res.status(500).json(err);
        console.log('ERROR WHILE LOGIN INTO STORE ACCOUNT!')
    })
}
})





// Create a new Store (ADMIN)

router.post('/createstore', (req, res, next) => {
    const newStore = new Store({
        storemongoid: new mongoose.Types.ObjectId(),
        storeid: req.body.storeid,
        storename: req.body.storename,
        storeemail: req.body.storeemail,
        storepassword: req.body.storepassword,
        tables: req.body.tables,
        
        
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
   Store.findOne({ storeid: req.params.storeid})
        .exec()
        .then(result => {
            if(result){
                res.status(200).json(result)
                console.log('Store was found by id')
            }
            else{
                res.status(404).json(result)
                console.log('Error 404 - No Store Found')
            }
            
        })
        .catch(err => {
            res.status(500).json(err)
            console.log('failed to get Store by id')
        })
})

// Adds Itemlistid to the created Store




router.patch('/additemlistid', (req, res, next) => {
    Store.findOneAndUpdate({storeid: req.body.storeid}, {itemlistid: req.body.itemlistid})
    .exec()
        .then(result => {
            res.status(201).json(result)
            console.log('Item List ID ' + result.data.itemlistid + 'was added to ' + result.data.storeid)
        })
        .catch(err => {
            res.status(500).json(err)
            console.log('Itemlistid could not be added to Store')
        })
})





router.get('/getexistingtables/:storeid', (req, res, next) => {
    Store.findOne({storeid: req.params.storeid})
    .then(result => {
        res.status(200).json(result);
        console.log('getting existing tables')
    })
    .catch(err => {
        res.status(500).json(err);
        console.log('getting existing tables failed')
    } )
})






module.exports = router;