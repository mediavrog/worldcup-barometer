'use strict';

/**
 * CRUD controller for matches.
 */
angular.module('mean').controller('MatchesController', ['$scope', '$stateParams', '$location', 'Global', 'Matches', 'Me',
    function ($scope, $stateParams, $location, Global, Matches, Me) {
        $scope.global = Global;

        $scope.hasAuthorization = function (match) {
            if (!match || !match.user) return false;
            return $scope.global.isAdmin;
        };

        $scope.create = function (isValid) {
            if (isValid) {
                var match = new Matches({
                    started_at: this.started_at,
                    ended_at: this.ended_at,
                    team1: this.team1,
                    team2: this.team2
                });

                match.$save(function (response) {
                    $location.path('matches/' + response._id);
                });

                this.title = '';
                this.content = '';
            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function (match) {
            if (match) {
                match.$remove();

                for (var i in $scope.matches) {
                    if ($scope.matches[i] === match) {
                        $scope.matches.splice(i, 1);
                    }
                }
            } else {
                $scope.match.$remove(function (response) {
                    $location.path('matches');
                });
            }
        };

        $scope.update = function (isValid) {
            if (isValid) {
                var match = $scope.match;
                match.$update(function () {
                    $location.path('matches/' + match._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function () {
            Matches.query(function (matches) {
                $scope.matches = matches;
            });
        };

        $scope.findOne = function () {
            Matches.get({
                matchId: $stateParams.matchId
            }, function (match) {
                $scope.match = match;
            });
        };
    }
]);
