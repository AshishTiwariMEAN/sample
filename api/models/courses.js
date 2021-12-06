'use strict';

var mongoose = require('mongoose'); 

var courseSchema = new mongoose.Schema({
    universitiesID:     { type: mongoose.Schema.Types.ObjectId, ref: 'universities' },
    name:               { type: String, },
    Teacher_name:        { type: String },
    isActive:           { type: Boolean, default: true },
    isDelete:           { type: Boolean, default: false }
}, {
        timestamps: true
    });

var courses = mongoose.model('courses', courseSchema);
module.exports = courses;