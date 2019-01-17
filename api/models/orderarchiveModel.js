const mongoose = require('mongoose');

const orderArchiveSchema = mongoose.Schema({
    usermongoid: mongoose.Schema.Types.ObjectId,
    storeid: String,
    tableid: String,
    orderid: String,
    userid: String,
    itemname: String,
    itemprice: String,
    status: String,
    timecreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OrderArchive', orderArchiveSchema);