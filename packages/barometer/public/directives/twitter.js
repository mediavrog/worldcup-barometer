'use strict';

/**
 * Shows a dynamically updating twitter stream for given keyword
 *
 * TODO: consider server push for registered keywords
 */
angular.module('mean')
    .directive('twitterStream', ['Twitter', '$interval', function (Twitter, $interval) {
        return {
            scope: {
                keyword: '@'
            },
            restrict: 'E',
            replace: true,
            template: '<div class="twitter" data-ng-init="loadTweets()"><!--Results for search: {{keyword}}-->' +
                '<ul class="media-list" ng-show="tweets"><li class="media" data-ng-repeat="tweet in tweets">' +
                '<a class="pull-left" href="https://twitter.com/{{tweet.user.screen_name}}"><img class="media-object" ng-src="{{tweet.user.profile_image_url}}" alt="..." width="48"></a>' +
                '<div class="media-body">' +
                '<blockquote><p>{{tweet.text}}</p>' +
                '<span class="small">{{tweet.user.screen_name}} | {{tweet.created_at | asDate | date:"h:mm a"}}</span>' +
                '</blockquote></div></li></ul>' +
                '<div ng-hide="tweets">Loading tweets...</div>' +
                '</div>',
            controller: function ($scope) {
                $scope.tweets = [];
                $scope.lastMaxId = null;

                var poller;
                $scope.loadTweets = function () {
                    poller = $interval(function () {
                        Twitter.get({keyword: $scope.keyword, sinceId: $scope.lastMaxId}, function (response) {
                            console.log('TWITTER updates', response);
                            $scope.tweets = response.statuses;
                            $scope.lastMaxId = response.search_metadata.max_id_str;
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