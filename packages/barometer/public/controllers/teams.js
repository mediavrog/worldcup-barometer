'use strict';

/**
 * CRUD controller for teams.
 */
angular.module('mean').controller('TeamsController', ['$scope', '$stateParams', '$location', 'Global', 'Teams',
    function($scope, $stateParams, $location, Global, Teams) {
        $scope.global = Global;

        $scope.hasAuthorization = function(team) {
            if (!team || !team.user) return false;
            return $scope.global.isAdmin;
        };

        $scope.create = function(isValid) {
            if (isValid) {
                var team = new Teams({
                    title: this.title,
                    slug: this.slug,
                    cup_slug: this.cup_slug
                });
                team.$save(function(response) {
                    $location.path('teams/' + response.slug);
                });

                this.title = '';
                this.slug = '';
                this.cup_slug = '';
            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function(team) {
            if (team) {
                team.$remove();

                for (var i in $scope.teams) {
                    if ($scope.teams[i] === team) {
                        $scope.teams.splice(i, 1);
                    }
                }
            } else {
                $scope.team.$remove(function(response) {
                    $location.path('teams');
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var team = $scope.team;
                team.$update(function() {
                    $location.path('teams/' + team.slug);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Teams.query(function(teams) {
                $scope.teams = teams;
            });
        };

        $scope.findOne = function() {
            Teams.get({
                teamSlug: $stateParams.teamSlug
            }, function(team) {
                $scope.team = team;
            });
        };
    }
]);
