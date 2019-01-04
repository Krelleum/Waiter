

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const jwt = require('jsonwebtoken');


router.post('/checktoken',(req, res, next) => {
    
    try{
        
        const decoded = jwt.verify(req.body.token, 'waiter');
        
        res.status(200).json({decoded: decoded})
        console.log('TOKEN VERIFIED!!!')
    }
    catch(err){
        
        return res.status(401).json({message: 'unauthorized'})

    }
});

module.exports = router;