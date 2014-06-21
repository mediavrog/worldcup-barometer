'use strict';

angular.module('mean')
    .directive('twitterStream', ['Twitter', '$interval', function (Twitter, $interval) {
        return {
            scope: {
                keyword: '@'
            },
            restrict: 'E',
            replace: true,
            template: '<div class="twitter" data-ng-init="loadTweets()"><!--Results for search: {{keyword}}-->' +
                '<ul class="media-list"><li class="media" data-ng-repeat="tweet in tweets">' +
                '<a class="pull-left" href="https://twitter.com/{{tweet.user.screen_name}}"><img class="media-object" src="{{tweet.user.profile_image_url}}" alt="..." width="48"></a>' +
                '<div class="media-body">' +
                '<blockquote><p>{{tweet.text}}</p>' +
                '<span class="small">{{tweet.user.screen_name}} | {{tweet.created_at | asDate | date:"h:mm a"}}</span>' +
                '</blockquote></div></li></ul>' +
                '</div>',
            controller: function ($scope) {
                $scope.tweets = [
                    {
                        text: 'Loading tweets ...',
                        user: {
                            profile_image_url: 'http://ajaxload.info/cache/ff/ff/ff/00/00/00/1-0.gif'
                        }
                    }
                ];

                var poller;
                $scope.loadTweets = function () {
                    console.log($scope.keyword);
                    poller = $interval(function () {
                        Twitter.get({keyword: ': #GER'}, function (response) {
                            console.log('TWITTER updates', response);
                            $scope.tweets = response.statuses;
                        });
                    }, 10000);
                };

                /**
                 * Cleans up the update timer (polling)
                 */
                $scope.stopUpdates = function () {
                    if (angular.isDefined(poller)) {
                        $interval.cancel(poller);
                        poller = undefined;
                    }
                };

                $scope.$on('$destroy', function () {
                    // Make sure that the interval is destroyed
                    $scope.stopUpdates();
                });
            }
        };
    }])
;