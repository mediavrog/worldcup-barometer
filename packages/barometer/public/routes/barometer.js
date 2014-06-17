'use strict';

angular.module('mean').config(['$stateProvider',
    function ($stateProvider) {
        // Check if the user is connected
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        $stateProvider
            .state('barometer', {
                url: '/barometer/',
                templateUrl: 'barometer/views/index.html'
            })
            .state('all matches', {
                url: '/matches',
                templateUrl: 'barometer/views/match_list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create match', {
                url: '/matches/create',
                templateUrl: 'barometer/views/match_create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit match', {
                url: '/matches/:matchId/edit',
                templateUrl: 'barometer/views/match_edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('match by id', {
                url: '/matches/:matchId',
                templateUrl: 'barometer/views/match_view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('all teams', {
                url: '/teams',
                templateUrl: 'barometer/views/team_list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create team', {
                url: '/teams/create',
                templateUrl: 'barometer/views/team_create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('team by id', {
                url: '/teams/:teamSlug',
                templateUrl: 'barometer/views/team_view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
        ;
    }
]);
