'use strict';
const mongodb = require('./mongodb');

const OAuthClient = mongodb.OAuthClient;
const OAuthScope = mongodb.OAuthScope;
const User = mongodb.User;

OAuthScope.find({}).remove()
    .then(function () {
        OAuthScope.create({
            scope: 'phobos-app',
            is_default: true
        })
            .then(function () {
                console.log('finished populating OAuthScope');
            });
    });

User.find({}).remove()
    .then(function () {
        User.create({
            username: 'admin',
            password: 'admin'
        })
            .then(function (user) {
                console.log('finished populating users', user);
                return OAuthClient.find({}).remove()
                    .then(function () {
                        OAuthClient.create({
                            client_id: 'democlient',
                            client_secret: 'democlientsecret',
                            redirect_uri: 'http://localhost/cb',
                            User: user._id
                        })
                            .then(function (client) {
                                console.log('finished populating OAuthClient', client);
                            }).catch(console.log);

                        OAuthClient.create({
                            client_id: 'democlient',
                            client_secret: 'democlientsecret',
                            redirect_uri: 'http://localhost/cb',
                            User: user._id
                        })
                            .then(function (client) {
                                console.log('finished populating OAuthClient', client);
                            }).catch(console.log);
                    });

            });


    });
