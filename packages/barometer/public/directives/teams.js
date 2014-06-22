'use strict';

angular.module('mean.barometer')
    .directive('teamInfo', function () {
        return {
            scope: {
                ngModel: '='
            },
            restrict: 'E',
            replace: true,
            template: '<div class="teamInfo"><img height="72" width="72" ng-src="/barometer/assets/img/flags/{{ngModel.slug | uppercase}}.png"/>' +
                '<h2>{{ngModel.title}}</h2>' +
                '<a href="https://twitter.com/search?src=typd&q=%23{{ngModel.slug}}">#{{ngModel.slug}}</a></div>'
        };
    })
    .directive('actionButtonCheer', ['Teams', function (Teams) {
        return {
            scope: {
                ngTeam: '=',
                ngMatch: '='
            },
            restrict: 'E',
            replace: true,
            template: '<div class="btn center-block {{buttonStyle}}">' +
                '<img height="64" width="64" ng-src="/barometer/assets/img/flags/{{ngTeam.slug | uppercase}}.png"/>' +
                '<br />Cheer for {{ngTeam.title}}' +
                '</div>',
            link: function (scope, elem, attrs) {
                // watcher on team to decide on initial style for cheer button
                scope.$watch('ngTeam', function (newMatch, oldMatch) {
                    if (angular.isDefined(newMatch)) {
                        scope.buttonStyle = new Date(newMatch.ended_at) >= new Date() ? 'btn-success' : 'btn-default';
                    }
                }, true);

                elem.bind('click', function () {
                    // only cheer if match not finished already
                    if (new Date(scope.ngMatch.ended_at) >= new Date()) {
                        //console.log('Cheer for team ' + scope.ngTeam.slug);

                        // always update team support
                        scope.ngTeam.support++;

                        // since the teams model might just be a plain old javascript object
                        // when referenced by match, we use the service update method in that case
                        // otherwise, we use the standard $update method on the resource
                        // TODO: find out if there a better way
                        if (angular.isDefined(scope.ngTeam.$update)) {
                            scope.ngTeam.$update(function () {
                                //console.log('Team updated (using self aware resource)');
                            });
                        } else {
                            Teams.update(scope.ngTeam, function () {
                                //console.log('Team updated (using service)');
                            });
                        }

                        // match handling
                        if (angular.isDefined(scope.ngMatch)) {
                            //console.log('... in match ' + scope.ngMatch._id);
                            if (scope.ngMatch.team1.slug === scope.ngTeam.slug) {
                                scope.ngMatch.team1_support++;
                            } else {
                                scope.ngMatch.team2_support++;
                            }

                            //console.log('Update match ', scope.ngMatch, scope.ngMatch.$update);
                            scope.ngMatch.$update(function () {
                                //console.log('Match updated');
                            });
                        }

                        scope.$apply();
                    } else {
                        alert('Thank you for cheering. Since this match ended already, cheering is stopped now.');
                        scope.buttonStyle = 'btn-default';
                        scope.$apply();
                    }
                });
            }
        };
    }])
//    .directive('actionButtonBoo', ['$http', function ($http) { //http://stackoverflow.com/a/22142363/472262
//        return {
//            scope: {
//                ngModel: '=',
//                matchId: '@'
//            },
//            restrict: 'E',
//            replace: true,
//            template: '<div class="btn btn-danger center-block">Boo</div>{{matchId}}'
//        };
//    }])
;