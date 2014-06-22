'use strict';

module.exports = {
    db: 'mongodb://heroku:0LF6T5oojF0vBa7nz2R52Uwe6pYXLMBHxcUURd2TJ7-wALfVnaAENPFmLCR1CAMlwl2SjvstH6RokNiA8h-LSw@kahana.mongohq.com:10075/app26441635',
    app: {
        name: 'Worldcup Barometer'
    },
    facebook: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    twitter: {
        clientID: 'd7CO19fnPpLXbs0agUmSvlCgW',
        clientSecret: 'YforTfhXY38dzA84EstX3sXphichUgSMuWtfALfl6MQLlEzmb7',
        callbackURL: 'http://worldcup-barometer.herokuapp.com/auth/twitter/callback'
    },
    github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    linkedin: {
        clientID: 'API_KEY',
        clientSecret: 'SECRET_KEY',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }
};
