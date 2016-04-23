'use strict';

issueTrackerSystem.controller('UserController', [
    '$scope',
    '$location',
    '$window',
    '$timeout',
    'notificationService',
    'userService',
    function($scope, $location, $window, $timeout, notificationService, userService) {

        $scope.showForm = false;

        $scope.show = function show() {
            $scope.showForm = !$scope.showForm;
        };

        $scope.logout = function logout() {
            userService.logOut()
                .then(function(data) {
                    notificationService.showInfo('Logout successful', data);
                    sessionStorage.clear();

                    $timeout(function () {
                        $window.location.reload(false);
                    }, 500);

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
                    notificationService.showError('Request failed ' + error.statusText);
                });
        };

        $scope.changePassword = function changePassword(user) {
            userService.changePassword(user)
                .then(function(data) {
                    notificationService.showInfo('Password is schanged' ,data);
                }, function(error) {
                    notificationService.showError('Password is not changed', error);
                });
        };

        $scope.logOutBack = function logOutBack() {
            $location.path('/dashboard');
        }
    }
]);