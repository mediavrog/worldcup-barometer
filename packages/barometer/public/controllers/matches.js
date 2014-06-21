'use strict';

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

//            console.log('Has user object?');
//            console.log(Global.user);
//            console.log(Global.user.twitter);
//            Me.query(function(user) {
//                console.log(user);
//            });
        };

        $scope.remove = function (article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function (response) {
                    $location.path('matches');
                });
            }
        };

        $scope.update = function (isValid) {
            if (isValid) {
                var article = $scope.article;
                if (!article.updated) {
                    article.updated = [];
                }
                article.updated.push(new Date().getTime());

                article.$update(function () {
                    $location.path('matches/' + article._id);
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
