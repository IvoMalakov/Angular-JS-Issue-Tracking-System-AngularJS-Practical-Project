'use strict';

issueTrackerSystem.controller('EditIssueController', [
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'notificationService',
    function($scope, $location, $routeParams, issueService, notificationService) {

        var convertLabels = function toObject(inputArray) {
            var outputArrayAsJson = [];

            inputArray.forEach(function(element) {
                outputArrayAsJson.push({Name: element});
            });

            return outputArrayAsJson;
        };

        function getIssueById(id) {
            issueService.getIssueById(id)
                .then(function(response) {
                    $scope.issue = response.data;
                }, function(error) {
                    notificationService.showError('Request failed', error.statusText);
                });
        }

        getIssueById($routeParams.id);

        $scope.editIssue = function editIssue(issue) {
            var issueForEdit = {
                Title: issue.Title,
                Description: issue.Description,
                DueDate: issue.DueDate,
                ProjectId: parseInt($scope.issue.Project.Id),
                AssigneeId: issue.AssigneeId,
                PriorityId: issue.PriorityId,
                labels: convertLabels(issue.Labels)
            };

            issueService.editIssue(issueForEdit, $routeParams.id)
                .then(function() {
                    notificationService.showInfo('Issue edited successful');
                    $location.path('/issues' + $routeParams.id);
                }, function(error) {
                    notificationService.showError('Edit issue failed', error.statusText);
                });
        }
    }
]);