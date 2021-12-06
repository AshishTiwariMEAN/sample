'use strict';

const config = require('./config.js').get(process.env.NODE_ENV);

/* DB */
var mongoose = require('mongoose');
require('../api/models/university');
require('../api/models/courses');

/* end DB */


// database connection setup
mongoose.Promise = global.Promise;

var options = {
  user: config.db.user,
  pass: config.db.password
};
mongoose.connect(config.db.url,  function (error) {
  // Check error in initial connection. There is no 2nd param to the callback.
  if (error) {
    console.log('connection failed!', error)
  } else {
    console.log("Database connected successfully!");
  }
});
