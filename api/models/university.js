'use strict';

var mongoose = require('mongoose');

var universitieSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String }, 
    country : { type: String }, 
    minimum_gpa : { type: String },
    minimum_gre_score: { type: String },
    status: { type: String, default: 1 },       //1-Active, 0-InActive,
    isDelete: { type: Boolean, default: false },
}, {
        timestamps: true
});


var Universitie = mongoose.model('universities', universitieSchema);
module.exports = Universitie;