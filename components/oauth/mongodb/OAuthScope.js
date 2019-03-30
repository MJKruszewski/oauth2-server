'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const OAuthScopeSchema = new Schema({
    scope: String,
    is_default: Boolean
});

module.exports = mongoose.model('OAuthScope', OAuthScopeSchema);
