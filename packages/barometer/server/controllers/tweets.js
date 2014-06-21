'use strict';

// TODO find way to read global config

/**
 * Module dependencies.
 */
var TwitterApi = require('twit');
//config = require('./config');

// debug
var  clientID = 'g6bDthYtzCVy2GpAUn6GYcuPV';
var  clientSecret = '4e7hDTAaXT4gTTMvBEiryOsEYltt78YHznWPTw22ERuThiuFkn';
// live
//var clientID = 'd7CO19fnPpLXbs0agUmSvlCgW';
//var clientSecret = 'YforTfhXY38dzA84EstX3sXphichUgSMuWtfALfl6MQLlEzmb7';

/**
 * Create a tweet
 */
exports.create = function (req, res) {
    //console.log(req.user || null);

    var twitter = new TwitterApi({
        consumer_key: clientID,
        consumer_secret: clientSecret,
        access_token: req.user.twitter_token.token,
        access_token_secret: req.user.twitter_token.secret
    });

    twitter.post('statuses/update', { status: req.body }, function (err, data, response) {
        console.log(data);
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

    var twitter = new TwitterApi({
        consumer_key: clientID,
        consumer_secret: clientSecret,
        access_token: req.user.twitter_token.token,
        access_token_secret: req.user.twitter_token.secret
    });

    twitter.get('search/tweets', { q: req.query.keyword, count: 20, include_entities: 0 }, function (err, data, response) {
        if (err) {
            return res.jsonp(500, {
                error: 'Could not fetch tweets'
            });
        }
        res.jsonp(data);
    });
};