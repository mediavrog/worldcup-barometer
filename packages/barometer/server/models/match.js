'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Match Schema
 */
var MatchSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    started_at: {
        type: Date,
        required: true
    },
    ended_at: {
        type: Date,
        required: true
    },
    team1: {
        type: Schema.ObjectId,
        ref: 'Team',
        required: true
    },
    team2: {
        type: Schema.ObjectId,
        ref: 'Team',
        required: true
    },
    team1_support: {
        type: Number,
        default: 0
    },
    team2_support: {
        type: Number,
        default: 0
    },
    team1_boo: {
        type: Number,
        default: 0
    },
    team2_boo: {
        type: Number,
        default: 0
    },
    team1_points: {
        type: Number,
        default: 0
    },
    team2_points: {
        type: Number,
        default: 0
    }
});

/**
 * Validations
 */
MatchSchema.path('team1').validate(function (title) {
    return !!title;
}, 'You have to specify a team 1');

MatchSchema.path('team2').validate(function (title) {
    return !!title;
}, 'You have to specify a team 2');

MatchSchema.path('started_at').validate(function (content) {
    return !!content;
}, 'Please specify when the match starts');

MatchSchema.path('ended_at').validate(function (content) {
    return !!content;
}, 'Please specify when the match ends');

/**
 * Methods
 * TODO: find out how to use this model in frontend
 */
MatchSchema.methods.isUpcoming = function () {
    var time = new Date();
    var started = new Date(this.started_at);
    return started > time;
};

MatchSchema.methods.isFinished = function () {
    var time = new Date();
    var ended = new Date(this.ended_at);
    return ended < time;
};

MatchSchema.methods.isRunning = function () {
    var time = new Date();
    var started = new Date(this.started_at);
    var ended = new Date(this.ended_at);
    return started <= time && ended >= time;
};

/**
 * Statics
 */
MatchSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).populate('team1').populate('team2').exec(cb);
};

mongoose.model('Match', MatchSchema);
