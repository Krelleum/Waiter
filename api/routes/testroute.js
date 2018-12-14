const express = require('express');

const router = express.Router();


router.get('/getpost', (req, res, next) => {
    console.log('Request received');
    res.status(200).json({name: 'Kevin', age: '22'});
})


module.exports = router;