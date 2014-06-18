'use strict';

angular.module('mean.barometer').directive('teamInfo', function () {
    return {
        scope: {
            ngModel: '='
        },
        restrict: 'E',
        replace: true,
        template: '<div class="teamInfo"><img height="72" width="72" src="/barometer/assets/img/flags/{{ngModel.slug | uppercase}}.png"/>' +
            '<h2>{{ngModel.title}}</h2>' +
            '<a href="https://twitter.com/search?src=typd&q=%23{{ngModel.slug}}">#{{ngModel.slug}}</a></div>'
    };
});