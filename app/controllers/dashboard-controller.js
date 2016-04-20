'use strict';

issueTrackerSystem.controller('DashboardController', [
    '$scope',
    '$location',
    '$timeout',
    'authorizationService',
    'notificationService',
    'projectService',
    'issueService',
    function($scope, $location, $timeout, authorizationService, notificationService, projectService, issueService) {

        $scope.myStaff = function (item) {
            return item.Lead.userName === sessionStorage['userName'];
        };

        var userName = authorizationService.getLoggedUserName(),
            pageNumber = 1;

        projectService.getMyProjects(userName, pageNumber)
            .then(function(resolve) {
                $scope.allProjects = resolve.data.Projects;
            }, function(error) {
               notificationService.showError('Request failed', error.statusText);
            });

        issueService.getMyIssues(pageNumber)
            .then(function(resolve) {
                $scope.myIssues = resolve.data.Issues;
            }, function(error) {
                notificationService.showError('Request failed', error.statusText);
            });
    }
]);