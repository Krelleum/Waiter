const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    usermongoid: mongoose.Schema.Types.ObjectId,
    storeid: String,
    tableid: String,
    orderid: {type: Array, default: []},
    total: {type: Number, default: 0},
    timecreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);