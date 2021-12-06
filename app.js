'use strict';

var SwaggerExpress = require('swagger-express-mw');
var compression = require('compression');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var constant = require('./api/lib/constants.js');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
global.reqlib = require('app-root-path').require;
var request = require('request');
var fs = require('fs');
global.appDir = __dirname

var app = express();

module.exports = app; 

// compress all responses
app.use(compression());

process.env.NODE_ENV = process.env.NODE_ENV || 'live';
const config = require('./config/config.js').get(process.env.NODE_ENV);
require('./config/db');
app.use('/images', express.static(path.join(__dirname, './images')));
app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/assets', express.static(path.join(__dirname, './assets')));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));
var SwaggerConfig = {
    appRoot: __dirname // required config
};



SwaggerExpress.create(SwaggerConfig, function (err, swaggerExpress) {
    if (err) {
        throw err;
    }
     app.use(function (req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization,preauthentication,authentication');
        res.setHeader('Access-Control-Allow-Credentials', true);
        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });

    app.use('/api/*', function (err, req, res, next) {
        console.log('inside error handler')
        if (!err) {
            return next();
        }

        res.status(500);
        res.send('500: Internal server error');
    });


    // app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));

    app.use(bodyParser.json({
        limit: '50mb',
        type: 'application/json'
    }));

    //Check to call web services where token is not required//
    app.use('/api/*', function (req, res, next) {
        // console.log('req.baseUrl:-========================== ')
        var freeAuthPath = [
            '/api/getCourseList',
        ];
        var available = false;
        for (var i = 0; i < freeAuthPath.length; i++) {
            if (freeAuthPath[i] == req.baseUrl) {
                available = true;
                break;
            }
        }
        if (!available) {
        } else {
            next();
        }
    });
    var server = require('http').createServer(app);
    
    app.use(swaggerExpress.runner.swaggerTools.swaggerUi());
    swaggerExpress.register(app);
    app.use('/api/*', function (err, req, res, next) {
        console.log('inside error handler')
        if (!err) {
            return next();
        }

        res.status(500);
        res.send('500: Internal server error+');
    });
    var port = process.env.PORT || config.port;
    server.listen(port);


    /////////////////////////////////////////////////////////////////////////////////////////////////////

    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://127.0.0.1:' + port);
    }
    server.timeout = 1800000 //30 min
    // server.timeout = 0 //30 min

});
