'use strict';

issueTrackerSystem.controller('IssueController',[
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'notificationService',
    'projectService',
    'authorisationService',
    'statusService',
    function($scope, $location, $routeParams, issueService, notificationService, projectService, authorizationService, statusService) {

        var issueId = $routeParams.id,
            loggedUser = authorizationService.getLoggedUserName();

        $scope.isAdmin = authorizationService.isAdmin();
        $scope.showComments = false;

        $scope.show = function () {
            $scope.showComments = !$scope.showComments
        };

        function getIssueById(id) {
            issueService.getIssueById(id)
                .then(function (response) {
                    $scope.issue = response.data;
                    $scope.isAssignee = loggedUser === response.data.Assignee.Username;
                    aviableStatus(response.data.Status.Id);

                    projectService.getProjectById(response.data.Project.Id)
                        .then(function (response) {
                            var projectLead = response.data.Lead.Username;
                            $scope.isLeader = loggedUser === projectLead;
                        }, function (error) {
                            notificationService.showError('Request failed!', error.statusText);
                        });

                }, function (error) {
                    notificationService.showError('Request failed!', error.statusText);
                });
        }

        function getCommentsByIssueId(id) {
            issueService.getCommentsByIssueId(id)
                .then(function (response) {
                    $scope.comments = response.data;
                }, function (error) {
                    notificationService.showError('Request failed!', error.statusText);
                });
        }

        $scope.addComment = function addComment(text) {
            issueService.addComment(text, issueId)
                .then(function (response) {
                    notificationService.showInfo('Comment added successful');
                    $location.path('/issues');
                }, function (error) {
                    notificationService.showError('Request failed!', error.statusText);
                });
        };

        var convertLabels = function toObject(inputArray) {
            var outputArrayAsJson = [],
                inputArraySize = inputArray.length,
                i;
            for (i = 0; i < inputArraySize; i++) {
                outputArrayAsJson.push({'Name': inputArray[i]});
            }

            return outputArrayAsJson;
        };

        getIssueById($routeParams.id);
        getCommentsByIssueId($routeParams.id);

        function aviableStatus(id) {
            var statuses = [];

            switch (id) {
                case 2:
                    statuses = [
                        {'Id': 1, 'Name': 'Closed'},
                        {'Id': 3, 'Name': 'InProgress'}
                    ];
                    break;

                case 3:
                    statuses = [
                        {'Id': 1, 'Name': 'Closed'},
                        {'Id': 4, 'Name': 'StoppedProgress'}
                    ];
                    break;

                case 4:
                    statuses = [
                        {'Id': 3, 'Name': 'InProgress'},
                        {'Id': 1, 'Name': 'Closed'}
                    ];
                    break;
                default:
                    statuses = [];
                    break;
            }

            $scope.aviableStatus = statuses;
        }

        $scope.changeStatus = function changeStatus(statusId) {
            statusService.getStatus(issueId, statusId)
                .then(function() {
                    notificationService.showInfo('Status changed');
                }, function(error) {
                    notificationService.showError('Error! Status not changed', error.statusText);
                })
        }
    }
]);