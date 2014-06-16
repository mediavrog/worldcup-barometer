'use strict';

angular.module('mean.barometer').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('barometer example page', {
            url: '/barometer/example',
            templateUrl: 'barometer/views/index.html'
        });
    }
]);
