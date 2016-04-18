'use strict';

issueTrackerSystem.controller('IssueController',[
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'notificationService',
    function($scope, $location, $routeParams, issueService, notificationService) {

        $scope.showComennts = false;

        $scope.show = function() {
            $scope.showComennts = !$scope.showComennts;
        };

        function getIssueById(id) {
            issueService.getIssueById(id)
                .then(function(response) {
                    $scope.issue = response.data;
                }, function(error) {
                    notificationService.showError('Request failed!', error.statusText);
                });

            function getCommentsByIssueId(id) {
                issueService.getCommentsByIssueId(id)
                    .then(function(response) {
                        $scope.comments = response.data;
                    }, function(error) {
                        notificationService.showError('Request failed!', error.statusText);
                    });

                var convertLabels = function toObject(inputArray) {
                    var outputArrayAsJson = [],
                        inputArraySize = inputArray.length,
                        i;
                    for (i = 0; i < inputArraySize; i++) {
                        outputArrayAsJson.push({'Name': inputArray[i]});
                        return outputArrayAsJson;
                    }

                    getIssueById($routeParams.id);
                    getCommentsByIssueId($routeParams.id);
                }
            }
        }
    }
]);