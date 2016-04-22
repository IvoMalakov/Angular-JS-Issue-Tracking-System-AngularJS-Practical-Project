'use strict';

issueTrackerSystem.controller('ProjectsController', [
    '$scope',
    '$location',
    'projectService',
    'issueService',
    'notificationService',
    function($scope, $location, projectService, issueService, notificationService) {

        var pageNumber = 1;

        $scope.myStaff = function(item) {
            return item.Lead.UserName === sessionStorage['userName'];
        };

        projectService.getAllProjects(pageNumber)
            .then(function(resolve) {
                $scope.allProjects = resolve.data;
            }, function(error) {
                notificationService.showError('Request failed', error.statusText);
            });

        issueService.getIssues(pageNumber)
            .then(function(response) {
                $scope.myIssues = response.data.Issues;
            }, function(error) {
                notificationService.showError('Request failed', error.statusText);
            });
    }
]);