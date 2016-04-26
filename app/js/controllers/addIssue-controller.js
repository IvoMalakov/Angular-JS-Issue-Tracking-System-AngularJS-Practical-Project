'use strict';

issueTrackerSystem.controller('AddIssueController', [
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'notificationService',
    function($scope, $location, $routeParams, issueService, notificationService) {

        $scope.projectId = $routeParams.id;

        var convertLabels = function toObject(inputArray) {
            var outputArrayAsJson = [];

            inputArray.forEach(function(element) {
                outputArrayAsJson.push({Name: element});
            });

            return outputArrayAsJson;
        };

        $scope.addIssue = function (issueForAdd) {
            issueForAdd.ProjectId = $routeParams.id;

            if (issueForAdd.Labels) {
                issueForAdd.Labels = convertLabels(issueForAdd.Labels);
            }

            issueService.addIssue(issueForAdd)
                .then(function(response) {
                    notificationService.showInfo('Issue added successful');
                    $location.path('/projects/' + $scope.projectId);
                }, function(error) {
                    notificationService.showError('"Add Issue" failed', error.statusText);
                });
        }
    }
]);