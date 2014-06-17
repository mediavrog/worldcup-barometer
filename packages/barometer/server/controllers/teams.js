'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Team = mongoose.model('Team'),
    _ = require('lodash');


/**
 * Find team by id
 */
exports.team = function (req, res, next, id) {
    console.log('team: ' + id);

    Team.load(id, function (err, team) {
        if (err) return next(err);
        if (!team) return next(new Error('Failed to load team ' + id));
        req.team = team;
        next();
    });
};

/**
 * Create a team
 */
exports.create = function (req, res) {
    var team = new Team(req.body);

    console.log(team.title  + ' / ' + team.slug);

    team.save(function (err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot save the team'
            });
        }
        res.jsonp(team);
    });
};

/**
 * Update a team
 */
exports.update = function (req, res) {
    var team = req.team;

    team = _.extend(team, req.body);

    team.save(function (err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot update the team'
            });
        }
        res.jsonp(team);

    });
};

/**
 * Delete a team
 */
exports.destroy = function (req, res) {
    var team = req.team;

    team.remove(function (err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot delete the team'
            });
        }
        res.jsonp(team);

    });
};

/**
 * Show a team
 */
exports.show = function (req, res) {
    res.jsonp(req.team);
};

/**
 * List of teams
 */
exports.all = function (req, res) {
    Team.find().sort('-support').exec(function (err, teams) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the teams'
            });
        }
        res.jsonp(teams);

    });
};
