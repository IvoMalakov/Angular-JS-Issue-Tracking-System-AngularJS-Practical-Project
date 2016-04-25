'use strict';

issueTrackerSystem.controller('ProjectDetailController', [
    '$scope',
    '$location',
    '$routeParams',
    'projectService',
    'issueService',
    'notificationService',
    'authorizationService',
    function($scope, $location, $routeParams, projectService, issueService, notificationService, authorizationService) {

        $scope.admin = authorizationService.isAdmin();

        $scope.showDescription = false;
        $scope.showDescriptionText = 'Show description';
        $scope.showDescript = function(){
            $scope.showDescription = !$scope.showDescription;
            if($scope.showDescription){
                $scope.showDescriptionText = 'Hide description';
            } else {
                $scope.showDescriptionText = 'Show description';
            }
        };

        var getProjectById = function getProjectById(id) {
            projectService.getProjectById(id)
                .then(function(response) {
                    $scope.project = response.data;
                    $scope.priorities = response.data.Priorities;
                    $scope.leadUserName = response.data.Lead.Username;
                    $scope.leadId = response.data.Lead.Id;
                    $scope.isLeader = authorizationService.getLoggedUserName() === $scope.leadUserName;
                }, function(error) {
                    notificationService.showError('Request "Get project by ID" failed', error.statusText);
                });

            issueService.getIssuesByProjectId(id)
                .then(function(response) {
                    $scope.issuesById = response.data;
                    $scope.assignees =[];
                    $scope.issuesById.forEach(function(element) {
                        if($scope.assignees.indexOf(element.Assignee.Username === -1)) {
                            $scope.assignees.push(element.Assignee.Username);
                        }
                    });
                    $scope.admin = authorizationService.isAdmin();
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

            if($scope.isLeader){
                project.LeadId = $scope.leadId;
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