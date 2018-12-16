const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    storemongoid: mongoose.Schema.Types.ObjectId,
    storeid: String,
    storename: String,
    storeemail: String,
    storepassword: String,
    tables: {type: Array, default: []},
    itemlistid: String,
    timecreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Store', storeSchema);