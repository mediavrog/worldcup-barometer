'use strict';

/**
 * Provides live feed / match selector.
 */
angular.module('mean.barometer').controller('BarometerController', ['$scope', '$interval', 'Global', 'Matches', 'Twitter',
    function ($scope, $interval, Global, Matches, Twitter) {
        $scope.global = Global;
        $scope.match = null;
        $scope.matches = [];
        $scope.team_support = [
            {
                percentage: 50,
                value: 0,
                type: 'warning'
            },
            {
                percentage: 50,
                value: 0,
                type: 'info'
            }
        ];
        $scope.alerts = [];

        /**
         * Posts a tweet
         */
        $scope.tweet = function (tweetContent) {
            new Twitter({content: tweetContent}).$save(function (response) {
                console.log('TWITTER posted', response);
                $scope.addAlert('success', 'Your tweet was posted: ' + response.text);
            });
        };

        $scope.addAlert = function (type, msg) {
            $scope.alerts.push({type: type, msg: msg});
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        /**
         * Initializes this controller with matches for the dropdown and
         * sets up the most relevant (upcoming) match for display.
         */
        var poller;
        $scope.initialize = function () {
            Matches.most_relevant(function (matches) {
                $scope.matches = matches;
                $scope.match = matches[0];
                // checks for updates match support values
                // TODO: use server push (e. g. socket.io for broadcasting on model updates)
                poller = $interval(function () {
                    $scope.loadMatch($scope.match._id);
                }, 10000);
            });
        };

        /**
         * Reloads the currently selected match
         */
        $scope.loadMatch = function (matchId) {
            // console.log('Load match with id ' + matchId);
            Matches.get({
                matchId: matchId
            }, function (match) {
                //console.log('Loaded match..', match);
                $scope.match = match;
            });
        };

        /**
         * Cleans up the update timer (polling)
         */
        $scope.stopUpdates = function () {
            if (angular.isDefined(poller)) {
                $interval.cancel(poller);
                poller = undefined;
            }
        };

        $scope.$on('$destroy', function () {
            // Make sure that the interval is destroyed
            $scope.stopUpdates();
        });

        $scope.$watch('match', function (newMatch, oldMatch) {
            // console.log('Match  was updated ', newMatch);
            if (newMatch !== null) {
                var team1Support = $scope.match.team1_support;
                var team2Support = $scope.match.team2_support;
                var team1SupportPercentage = 50, team2SupportPercentage = 50;
                if (team1Support > 0 && team2Support > 0) {
                    team1SupportPercentage = Math.round(team1Support * 100 / (team1Support + team2Support));
                    team2SupportPercentage = 100 - team1SupportPercentage;
                }
                $scope.team_support[0].value = team1Support;
                $scope.team_support[0].percentage = team1SupportPercentage;
                $scope.team_support[1].value = team2Support;
                $scope.team_support[1].percentage = team2SupportPercentage;
            }
        }, true); // performs equality match
    }
]);
