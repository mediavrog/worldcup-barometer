'use strict';

var matches = require('../controllers/matches');
var teams = require('../controllers/teams');

// authorization helpers
var hasAuthorization = function (req, res, next) {
    if (!req.user.isAdmin) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

// The Package is past automatically as first parameter
module.exports = function (Barometer, app, auth, database) {

    app.route('/matches')
        .get(matches.all)
        .post(auth.requiresLogin, matches.create);
    app.route('/matches/:matchId')
        .get(matches.show)
        .put(auth.requiresLogin, hasAuthorization, matches.update)
        .delete(auth.requiresLogin, hasAuthorization, matches.destroy);
    app.param('matchId', matches.match);

    app.route('/teams')
        .get(teams.all)
        .post(auth.requiresLogin, teams.create);
    app.route('/teams/:teamSlug')
        .get(teams.show)
        .put(auth.requiresLogin, hasAuthorization, teams.update)
        .delete(auth.requiresLogin, hasAuthorization, teams.destroy);
    app.param('teamSlug', teams.team);
};