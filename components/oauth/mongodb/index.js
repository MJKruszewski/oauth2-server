const config = require('./../../../config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.uri, {useNewUrlParser: true});

const db = {};
db.OAuthAccessToken = require('./OAuthAccessToken');
db.OAuthAuthorizationCode = require('./OAuthAuthorizationCode');
db.OAuthClient = require('./OAuthClient');
db.OAuthRefreshToken = require('./OAuthRefreshToken');
db.OAuthScope = require('./OAuthScope');
db.User = require('./User');

module.exports = db;
