'use strict';

//Teams service used for articles REST endpoint
angular.module('mean').factory('Teams', ['$resource',
    function ($resource) {
        return $resource('teams/:teamSlug', {
            teamSlug: '@slug'
        }, {
            save:   {
                method:'POST',
                params: {teamSlug: '@_id'} // prevent slug being used for routing on creation
            },
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