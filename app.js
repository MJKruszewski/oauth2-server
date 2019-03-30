const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config.js');
const authenticate = require('./components/oauth/authenticate');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

if (config.seedMongoDB) {
    require('./components/oauth/seed-mongo');
}

/** Public Area **/

require('./components/oauth')(app);

/** Control Private through OAuth **/

app.get('/me', authenticate(), function(req,res){
    res.json({
        me: req.user,
        messsage: 'Authorization success, Without Scopes, Try accessing /profile with `profile` scope',
        description: 'Try postman https://www.getpostman.com/collections/37afd82600127fbeef28',
        more: 'pass `profile` scope while Authorize'
    })
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;
