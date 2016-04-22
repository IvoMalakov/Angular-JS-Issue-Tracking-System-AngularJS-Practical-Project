'use strict';

issueTrackerSystem.controller('AddProjectController', [
    '$scope',
    '$location',
    'projectService',
    'issueService',
    'notificationService',
    'userService',
    function($scope, $location, projectService, issueService, notificationService, userService) {

        var convertData = function(project) {
            project.labels = toObject(project.labels);
            project.priorities = toObject(project.priorities);

            function  toObject(inputArray) {
                var outputArrayAsJson = [];

                inputArray.forEach(function(element) {
                    outputArrayAsJson.push({Name: element});
                });

                return outputArrayAsJson;
            }

            return project;
        };

        $scope.addProject = function(object) {
            object = convertData(object);

            projectService.addProject(object)
                .then(function() {
                    notificationService.showInfo('Project added successful');
                    $location.path('/projects');
                }, function(error) {
                    notificationService.showError('"Add Project" failed', error.statusText);
                });
        };

        var getAllUsers = userService.getAllUsers()
            .then(function(resolve) {
                $scope.allUsers = resolve.data;
            }, function(error) {
                notificationService.showError('Request failed', error.statusText);
            });
    }
]);