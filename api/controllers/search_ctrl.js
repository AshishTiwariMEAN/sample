'use strict';

var mongoose = require('mongoose'),
formidable = require('formidable'),
University = mongoose.model('universities'),
Courses = mongoose.model('courses'),
Error = require('../lib/error.js'),
async = require('async'),
Response = require('../lib/response.js'),
constant = require('../lib/constants.js'),

waterfall = require('async-waterfall'),
moment = require('moment');


const config = require('../../config/config.js').get(process.env.NODE_ENV);

module.exports = {
    getCourseList: getCourseList,
    
};

function getCourseList(req, res) {
    var gpa = req.body.gpa;
    var greScore = req.body.grescore;
    var country = req.body.country;
    var courseName = req.body.courseName;
    var condition = {};
    var parent_condition = { minimum_gpa: gpa, minimum_gre_score: greScore, country:country  };
    var courseListArr = [];
      University.find(parent_condition).exec(function (err, story) {
        if (err) return handleError(err);
        if(story.length !== 0){
            //courseListArr.push(story);
            async.forEach(story, function (media, callbackImageUpload) {
              Courses.find({universitiesID : mongoose.Types.ObjectId(media._id)}).exec(function (err, courses) {
                story.push(courses);
                res.json(Response(constant.statusCode.ok, constant.messages.dataRetrievedSuccess, story));
                });
            })
        }else{
            res.json(Response(constant.statusCode.error, constant.messages.errorRetreivingData, story));
        }
        
    })

}
