'use strict';

// provides access to twitter
angular.module('mean').factory('Twitter', ['$resource',
    function ($resource) {
        return $resource('tweets', null);
    }
]);