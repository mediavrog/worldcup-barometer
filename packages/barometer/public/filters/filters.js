'use strict';

angular.module('mean.barometer')
    .filter('relativeMatchTime', function () {
        return function (match) {
            if(match === null) return '';
            var time = new Date();
            var started = new Date(match.started_at);
            var ended = new Date(match.ended_at);
            return started > time ? 'Upcoming' : (ended < time ? 'Finished' : 'Now playing');
        };
    })
    .filter('asDate', function () {
        return function (input) {
            return new Date(input);
        };
    })
;