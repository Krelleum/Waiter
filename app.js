//  Dependencies

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Route Import

const testroute = require('./api/routes/testroute');


//  Mongo Connect

mongoose.connect('mongodb://waiterdatabase:waiterdatabase30!@ds055865.mlab.com:55865/waiterdatabase')

// Body-Parser

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// CORS HANDLER

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


// Routing

app.use('/testroute', testroute);
// app.use('/order', orderRoute);
// app.use('/inbox', inboxRoute);
// app.use('/customer', customerRoute);
// app.use('/comment', commentRoute);
// app.use('/timestamp', timestampRoute)









// Middleware


module.exports = app;