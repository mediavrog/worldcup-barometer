'use strict';

angular.module('mean.barometer').controller('BarometerController', ['$scope', 'Global', 'Barometer',
    function($scope, Global, Barometer) {
        $scope.global = Global;
        $scope.package = {
            name: 'barometer'
        };
    }
]);
