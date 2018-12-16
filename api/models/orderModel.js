const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderid: mongoose.Schema.Types.ObjectId,
    userid: String,
    storeid: String,
    tableid: String,
    itemid: String,
    quantity: Number,
    status: String,
    timecreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);