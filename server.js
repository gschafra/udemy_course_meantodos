/*jslint node: true */
"use strict";

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var swagger = require('swagger-express');
var mongoose = require('mongoose');

var index = require('./routes/index');
var todos = require('./routes/todos');

// Init connection
mongoose.connect('mongodb://localhost/meantodos');
// set Promise provider to bluebird
mongoose.Promise = require('bluebird');

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client/src')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', index);
app.use('/api/v1/', todos);

/*app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './public/swagger/',
    basePath: 'http://localhost:3000',
    info: {
        title: 'swagger-express sample app',
        description: 'Swagger + Express = {swagger-express}'
    },
    apis: ['./api.yml'],
    middleware: function(req, res) {}
}));*/

app.listen(3000, function() {
    console.log('Server started on port 3000...');
});