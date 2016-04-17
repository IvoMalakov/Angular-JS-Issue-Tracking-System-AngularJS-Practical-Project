'use strict';

issueTrackerSystem.controller('UserController', [
    '$scope',
    '$location',
    'notificationService',
    'userService',
    function($scope, $location, notificationService, userService) {

        var id = sessionStorage['Id'];

        $scope.logout = function() {
            userService.logOut()
                .then(function(data) {
                    notificationService.showInfo('Logout successful', data);
                    sessionStorage.clear();
                    $location.path('/');

                }, function(error) {
                    notificationService.showError('Request failed' + error.statusText);
                });
        };

        $scope.makeAdmin = function makeAdmin(id) {
            userService.makeAdmin(id)
                .then(function(data) {
                    notificationService.showInfo('User was made as admin' ,data);
                }, function(error) {
                    notificationService.showError('Request failed' + error.statusText);
                });
        };

        $scope.changePassword = function changePassword(user) {
            userService.changePassword(user)
                .then(function(data) {
                    notificationService.showInfo('Password is schanged' ,data);
                }, function(error) {
                    notificationService.showError('Password is not changed', error);
                });
        }
    }
]);