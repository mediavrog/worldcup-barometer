'use strict';

angular.module('mean.barometer').factory('Barometer', [
    function () {
        return {
            name: 'barometer'
        };
    }
]);

//Teams service used for articles REST endpoint
angular.module('mean').factory('Teams', ['$resource',
    function ($resource) {
        return $resource('teams/:teamSlug', {
            slug: '@slug'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

//Matches service used for articles REST endpoint
angular.module('mean').factory('Matches', ['$resource',
    function ($resource) {
        return $resource('matches/:matchId', {
            matchId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            most_relevant: {
                method: 'GET',
                params: {sort_by: '-relevancy'},
                isArray: true
            }
        });
    }
]);

angular.module('mean').factory('Me', ['$resource',
    function ($resource) {
        return $resource('users/me', {}, {
            query: {method: 'GET', params: {}, isArray: false}
        });
    }
]);