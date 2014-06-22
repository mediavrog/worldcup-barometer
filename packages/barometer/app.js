'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Barometer = new Module('Barometer');
/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Barometer.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Barometer.routes(app, auth, database);

    //Barometer.angularDependencies(['ui.bootstrap.datetimepicker']);

    //We are adding a link to the main menu for all authenticated users
    Barometer.menus.add({
        roles: ['authenticated'],
        title: 'Match live feed',
        link: 'barometer',
        menu: 'main'
    });

    Barometer.menus.add({
        roles: ['authenticated'],
        title: 'All matches',
        link: 'all matches',
        menu: 'main'
    });

    Barometer.menus.add({
        roles: ['authenticated'],
        title: 'All teams',
        link: 'all teams',
        menu: 'main'
    });

    Barometer.menus.add({
        roles: ['authenticated'],
        title: 'Create match',
        link: 'create match',
        menu: 'main'
    });

    Barometer.menus.add({
        roles: ['authenticated'],
        title: 'Create team',
        link: 'create team',
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Barometer.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Barometer.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Barometer.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    Barometer.aggregateAsset('css', 'styles.css');

    return Barometer;
});
