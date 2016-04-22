'use strict';

issueTrackerSystem.controller('ProjectDetailController', [
    '$scope',
    '$location',
    '$routeParams',
    'projectService',
    'issueService',
    'notificationService',
    function($scope,$location, $routeParams, projectService, issueService, notificationService) {

        var getProjectById = function getProjectById(id) {
            projectService.getProjectById(id)
                .then(function(response) {
                    $scope.project = response.data;
                    $scope.priorities = response.data.Priorities;
                    $scope.isLeader = sessionStorage.userName === response.data.Lead.UserName || sessionStorage['isAdmin'];
                }, function(error) {
                    notificationService.showError('Request "Get project by ID" failed', error.statusText);
                });

            issueService.getIssueById(id)
                .then(function(response) {
                    $scope.issueById = response.data;
                }, function(error) {
                    notificationService.showError('Request "Get issues" failed', error.statusText);
                });
        };

        var convertData = function(project) {
            project.labels = toObject(project.labels);
            project.priorities = toObject(project.priorities);

            function toObject(inputArray) {
                var outputArrayAsJson = [],
                    inputArraySize = inputArray.length,
                    i;
                for (i = 0; i < inputArraySize; i++) {
                    outputArrayAsJson.push({'Name': inputArray[i]});
                }
                return outputArrayAsJson;
            }

            return project;
        };

        $scope.editProject = function(object) {
            object = convertData(object);
            projectService.editProject(object)
                .then(function() {
                    notificationService.showInfo('Project edited successful');
                    $location.path('/projects');
                }, function(error) {
                    notificationService.showError('"Edit Project" failed', error.statusText);
                });
        };

        if (isNaN($routeParams.id)) {
            $location.path('/projects');
        } else {
            getProjectById($routeParams.id);
        }
    }
]);