'use strict';

issueTrackerSystem.controller('ProjectsController', [
    '$scope',
    '$location',
    'projectService',
    'issueService',
    'notificationService',
    'authorizationService',
    'pageSize',
    function($scope, $location, projectService, issueService, notificationService, authorizationService, pageSize) {

        var pageNumber = 1;

        $scope.admin = authorizationService.isAdmin();

        $scope.getAllProjects = function(params) {
            projectService.getAllProjects(params)
                .then(function(resolve) {
                    $scope.allProjects = resolve.data.Projects;
                    $scope.numItems = resolve.data.TotalPages;
                }, function(error) {
                    notificationService.showError('Request failed', error.statusText);
                });
        };

        $scope.getIssues = function(params) {
            issueService.getIssues(params)
                .then(function(response) {
                    $scope.myIssues = response.data.Issues;
                }, function(error) {
                    notificationService.showError('Request failed', error.statusText);
                });
        };

        $scope.getProjectsByLead = function(lead) {
            projectService.getMyProjects(lead, pageNumber)
                .then(function(resolve) {
                    $scope.allProjects = resolve.data.Projects;
                }, function(error) {
                    notificationService.showError('Request failed', error.statusText);
                });
        };

        $scope.getAllProjectsByName = function(name) {
            projectService.getAllProjectsByName(name, pageNumber)
                .then(function(resolve) {
                    $scope.allProjects = resolve.data.Projects;
                }, function(error) {
                    notificationService.showError('Request failed', error.statusText);
                });
        };

        $scope.projectRequestParams = {
            pageNumber: 1,
            pageSize: pageSize
        };

        $scope.reloadProjects = function() {
            $scope.getAllProjects($scope.projectRequestParams);
        };

        $scope.getAllProjects($scope.projectRequestParams);

        $scope.issueRequestParams = {
            pageNumber: 1,
            pageSize: pageSize
        };

        $scope.reloadIssues = function() {
            $scope.getIssues($scope.issueRequestParams);
        };

        $scope.getIssues($scope.issueRequestParams);

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