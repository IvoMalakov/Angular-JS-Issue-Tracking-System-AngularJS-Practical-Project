'use strict';

issueTrackerSystem.controller('CommonController', [
    '$scope',
    '$location',
    'authenticationService',
    'notificationService',
    'userService',
    'projectService',
    function($scope, $location, authenticationService, notificationService, userService, projectService) {

        $scope.currentUser = {
            UserName: sessionStorage.userName,
            Id: sessionStorage.userId,
            isAdmin: sessionStorage.isAdmin
        };

        userService.getAllUsers()
            .then(function(response) {
                $scope.allUsers = response;
            }, function(error) {
                notificationService.showError('Request failed', error.statusText);
            });

        projectService.getAllExistingLabels()
            .then(function(response) {
                $scope.allLabels = response;
            }, function(error) {
                notificationService.showError('Request failed', error.statusText);
            });

        $scope.hide = true;

        $scope.showLabels = function() {
            $scope.hide = false;
        };

        $scope.checkTextLength = function(text) {
            console.log(text);
        };
    }
]);