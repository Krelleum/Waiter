const mongoose = require('mongoose');

const itemListSchema = mongoose.Schema({
    itemlistmongoid: mongoose.Schema.Types.ObjectId,
    itemlistid: String,
    storeid: String,
    itemcategories: { type: Array, default: [] },
    items: {type: Array, default: []},
    timecreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Itemlist', itemListSchema);