'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Match = mongoose.model('Match'),
    _ = require('lodash');


/**
 * Find match by id
 */
exports.match = function (req, res, next, id) {
    Match.load(id, function (err, match) {
        if (err) return next(err);
        if (!match) return next(new Error('Failed to load match ' + id));
        req.match = match;
        next();
    });
};

/**
 * Create a match
 */
exports.create = function (req, res) {
    var match = new Match(req.body);
    match.team1 = req.team1;
    match.team2 = req.team2;

    match.save(function (err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot save the match'
            });
        }
        res.jsonp(match);

    });
};

/**
 * Update a match
 */
exports.update = function (req, res) {
    var match = req.match;

    match = _.extend(match, req.body);

    match.save(function (err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot update the match'
            });
        }
        res.jsonp(match);

    });
};

/**
 * Delete a match
 */
exports.destroy = function (req, res) {
    var match = req.match;

    match.remove(function (err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot delete the match'
            });
        }
        res.jsonp(match);

    });
};

/**
 * Show a match
 */
exports.show = function (req, res) {
    res.jsonp(req.match);
};

/**
 * List of matches
 */
exports.all = function (req, res) {
    Match.find().sort('-started_at').populate('team1').populate('team2').exec(function (err, matches) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the matches'
            });
        }
        res.jsonp(matches);
    });
};
