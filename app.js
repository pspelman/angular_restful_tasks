var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser')
// var methodOverride = require('method-override')

//Task model
require('./models/Tasks');

var taskRouter = require('./routes/tasks');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restful_tasks');

var app = express();

// app.use(express.static(__dirname + '/myAngularApp/dist'));
app.use(express.static(path.join(__dirname, '/myAngularApp/dist')));

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: true }));
//for JSON configuration:
app.use(bodyParser.json());

//handle the requests in the router
app.get('/', function (req, res) {
    res.redirect('/tasks')
});

app.use('/', taskRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({message: "Error during navigation", errors:err.status})
    // res.render('error');
});

app.listen(8000, function () {
    console.log(`listening on port 8000`,);
});

module.export = app;
module.exports.mongoose = mongoose;

