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
            Username: sessionStorage.userName,
            Id: sessionStorage.userId,
            isAdmin: sessionStorage.isAdmin
        };

        var filter = function(users, val) {
          var filtered = [];
            angular.forEach(users, function(item) {
                if (item.UserName.toLowerCase().indexOf(val) === 0) {
                    filtered.push(item);
                }
            });

            return filtered;
        };

        $scope.getAllUsers = function(val) {
            userService.getAllUsers()
                .then(function(response) {
                    $scope.allUsers = filter(response, val);
                }, function(error) {
                    notificationService.showError('Request failed', error.statusText);
                });
        };

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