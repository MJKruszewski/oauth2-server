'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    scope: String
});

module.exports = mongoose.model('User', UserSchema);

