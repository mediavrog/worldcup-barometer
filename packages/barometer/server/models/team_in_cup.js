'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Match Schema
 */
var TeamInCupSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        index: {unique: true, dropDups: true}
    },
    cup_slug: { // Cup is only a twitter slug for simplicity
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0
    },
    support: {
        type: Number,
        default: 0
    },
    boo: {
        type: Number,
        default: 0
    }
});

/**
 * Validations
 */
TeamInCupSchema.path('title').validate(function (title) {
    return !!title;
}, 'Title cannot be blank');

TeamInCupSchema.path('slug').validate(function (slug) {
    return !!slug;
}, 'Slug cannot be blank');

TeamInCupSchema.path('cup_slug').validate(function (cup_slug) {
    return !!cup_slug;
}, 'Cup cannot be blank');

/**
 * Statics
 */
TeamInCupSchema.statics.load = function (id, cb) {
    this.findOne({
        slug: id
    }).exec(cb);
};

mongoose.model('Team', TeamInCupSchema);
