'use strict';

issueTrackerSystem.controller('AddProjectController', [
    '$http',
    '$scope',
    '$location',
    'projectService',
    'issueService',
    'notificationService',
    function($http, $scope, $location, projectService, issueService, notificationService) {

        var convertToPureDate = function(project) {
            var str = project.Name,
                matches = str.match(/\b(\w)/g),
                acronym;

            if (!matches) {
                acronym = str.slice(0, 2);
            } else {
                acronym = matches.join('');
            }

            project.ProjectKey = acronym.toUpperCase();

            project.labels = toObject(project.labels);
            project.priorities = toObject(project.priorities);

            function toObject(inputArray) {
                var outputArrayAsJson = [];

                inputArray.forEach(function(element) {
                    outputArrayAsJson.push({
                        Name: element
                    });
                });

                return outputArrayAsJson;
            }

            return project;
        };

        $scope.addProject = function(project, id) {
            project = convertToPureDate(project);

            projectService.addProject(project)
                .then(function() {
                    notificationService.showInfo('Project added successful');
                    $location.path('/projects');
                }, function(error) {
                    notificationService.showError('"Add Project" failed', error.statusText);
                });
        }
    }
]);