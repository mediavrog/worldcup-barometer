'use strict';

// The Package is past automatically as first parameter
module.exports = function(Barometer, app, auth, database) {

    app.get('/barometer/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/barometer/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/barometer/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/barometer/example/render', function(req, res, next) {
        Barometer.render('index', {
            package: 'barometer'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
