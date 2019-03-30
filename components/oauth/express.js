const oauthServer = require('oauth2-server');
const Request = oauthServer.Request;
const Response = oauthServer.Response;
const db = require('./mongodb');
const oauth = require('./oauth');
const mongoModel = require('./mongo-models');

module.exports = function (app) {
    app.post('/oauth/token', (req, res, next) => {
        let request = new Request(req);
        let response = new Response(res);

        oauth
            .token(request, response, {accessTokenLifetime: 60 * 180})
            .then(token => {
                // Todo: remove unnecessary values in response
                return res.json(token)
            }).catch(err => res.status(500).json(err))
    });

    app.delete('/oauth/token', (req, res, next) => {
        let request = new Request(req);

        mongoModel.revokeToken(request.body.token).then(() => {
            return res.json({
                status: "removed"
            })

        }).catch(err => res.status(500).json(err));

    });

    app.post('/authorise', (req, res) => {
        let request = new Request(req);
        let response = new Response(res);

        return oauth.authorize(request, response).then(function (success) {
            //  if (req.body.allow !== 'true') return callback(null, false);
            //  return callback(null, true, req.user);
            res.json(success)
        }).catch(err => {
            res.status(err.code || 500).json(err)
        })
    });

    app.get('/authorise', function (req, res) {
        return db.OAuthClient.findOne({
            where: {
                client_id: req.query.client_id,
            },
            attributes: ['id', 'name'],
        })
            .then(model => {
                if (!model) return res.status(404).json({error: 'Invalid Client'});
                return res.json(model);
            }).catch(err => res.status(err.code || 500).json(err));
    });
};
