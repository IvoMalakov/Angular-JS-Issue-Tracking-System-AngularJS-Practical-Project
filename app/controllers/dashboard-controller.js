'use strict';

issueTrackerSystem.controller('DashboardController', [
    '$scope',
    '$location',
    'authorizationService',
    'notificationService',
    'projectService',
    'issueService',
    function($scope, $location, authorizationService, notificationService, projectService, issueService) {

        $scope.admin = authorizationService.isAdmin();
        var userName = authorizationService.getLoggedUserName(),
            pageNumber = 1;

        projectService.getMyProjects(userName, pageNumber)
            .then(function(response) {
                $scope.allProjects = response.data.Projects;
            }, function(error) {
                notificationService.showError('Request failed', error.statusText);
            });

        issueService.getMyIssues(pageNumber)
            .then(function(response) {
                $scope.myIssues = response.data.Issues;
            }, function(error) {
                notificationService.showError('Request failed', error.statusText);
            });

        $scope.projectsPreview = true;
        $scope.issuesPreview = false;
        $scope.showOtherTab = function(tab) {
            if (tab === 'projects') {
                $scope.projectsPreview = true;
                $scope.issuesPreview = false;
            } else {
                $scope.projectsPreview = false;
                $scope.issuesPreview = true;
            }
        }
    }
]);