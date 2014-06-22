'use strict';


/**
 * Module dependencies.
 */
var TwitterApi = require('twit'),
    config = require('../../../../server/config/config');
// TODO find proper way to read app config

/**
 * Create a tweet
 */
exports.create = function (req, res) {
    var twitter = new TwitterApi({
        consumer_key: config.twitter.clientID,
        consumer_secret: config.twitter.clientSecret,
        access_token: req.user.twitter_token.token,
        access_token_secret: req.user.twitter_token.secret
    });

    twitter.post('statuses/update', { status: req.body.content }, function (err, data, response) {
        console.log(err);
        console.log(data);
        console.log(response);
        if (err) {
            return res.jsonp(500, {
                error: 'Could not send tweet'
            });
        }
        res.jsonp(data);
    });
};

/**
 * Get tweets for search
 */
exports.search = function (req, res) {
    //console.log(req.query.keyword, clientID, clientSecret, req.user.twitter_token.token, req.user.twitter_token.secret);
    if(req.query.keyword === null) return res.jsonp({});

    var twitter = new TwitterApi({
        consumer_key: config.twitter.clientID,
        consumer_secret: config.twitter.clientSecret,
        access_token: req.user.twitter_token.token,
        access_token_secret: req.user.twitter_token.secret
    });

    twitter.get('search/tweets', { q: req.query.keyword, count: 10, include_entities: 0, since_id: req.query.since_id }, function (err, data, response) {
        if (err) {
            return res.jsonp(500, {
                error: 'Could not fetch tweets'
            });
        }
        res.jsonp(data);
    });
};