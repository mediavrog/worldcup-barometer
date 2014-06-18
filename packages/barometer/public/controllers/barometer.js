'use strict';

angular.module('mean.barometer').controller('BarometerController', ['$scope', 'Global', 'Barometer', 'Matches',
    function ($scope, Global, Barometer, Matches) {
        $scope.global = Global;
        $scope.match = {};
        $scope.matches = [];
        $scope.team_support = [
            {
                percentage: 50,
                value: 0,
                type: 'success'
            },
            {
                percentage: 50,
                value: 0,
                type: 'info'
            }
        ];

        $scope.selectMatch = function (match) {
            $scope.match = match;

            var team1Support = $scope.match.team1.support;
            var team2Support = $scope.match.team2.support;
            var team1SupportPercentage = 50, team2SupportPercentage = 50;
            if (team1Support > 0 && team2Support > 0) {
                team1SupportPercentage = team1Support * 100 / (team1Support + team2Support);
                team2SupportPercentage = 100 - team1SupportPercentage;
            }
            $scope.team_support[0].value = team1Support;
            $scope.team_support[0].percentage = team1SupportPercentage;
            $scope.team_support[1].value = team2Support;
            $scope.team_support[1].percentage = team2SupportPercentage;
        };

        $scope.loadRelevantMatch = function () {
            Matches.most_relevant(function (matches) {
                $scope.matches = matches;
                $scope.selectMatch(matches[0]);
            });
        };
    }
]);
