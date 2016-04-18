'use strict';

issueTrackerSystem.controller('DashboardController', [
    '$scope',
    '$location',
    'authenticationService',
    'notificationService',
    'userService',
    'projectService',
    function($scope, $location, authenticationService, notificationService, userService, projectService) {

        $scope.myStaff = function(item) {
            return item.Lead.userName === sessionStorage['userName'];
        };

        var convertData = function(project) {
            project.labels = toObject(project.labels);
            project.priorities = toObject(project.priorities);

            function  toObject(inputArray) {
                var outputArrayAsJson = [],
                    inputArraySize = inputArray.length,
                    i;

                for(i = 0; i < inputArraySize; ++i) {
                    outputArrayAsJson.push({'Name' : inputArray[i]});
                }

                return outputArrayAsJson;
            }

            return project;
        };

        $scope.addProject = function(project) {
            var object = convertData(project);
            projectService.addProject(object)
                .then(function() {
                    notificationService.showInfo('Project added successful');
                    $location.path('/projects');
                }, function(error) {
                    notificationService.showError('"Add Project" failed', error.statusText);
                });
        };

        projectService.getAllProjects()
            .then(function(response) {
                $scope.allProjects = response.data;
            }, function(error) {
                notificationService.showError('Request failed', error.statusText);
            });

        var priorityName = 'Urgent',
            pageNumber = 20;

        issueService.getIssues(priorityName, pageNumber)
            .then(function(response) {
                $scope.myIssues = response.data.Issues;
                console.log(response.data);
            }, function(error) {
                notificationService.showError('Request failed', error.statusText)
            })
    }
]);