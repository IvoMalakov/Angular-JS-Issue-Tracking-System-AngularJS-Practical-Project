'use strict';

issueTrackerSystem.controller('HomeController', [
    '$scope',
    '$location',
    'authenticationService',
    'notificationService',
    'userService',
    function($scope, $location, authenticationService, notificationService, userService) {

        var getCurrentUserInfo = function() {
            userService.getCurrentUser()
                .then(function(currentUser) {
                    sessionStorage['userName'] = currentUser.Username;
                    sessionStorage['userId'] = currentUser.Id;
                    sessionStorage['isAdmin']= currentUser.isAdmin;

                    $scope.currentUser = currentUser;
                    $scope.userName = currentUser.userName;
                    $scope.isSomeoneLoggedIn = true;

                }, function(error) {
                    notificationService.showError('Request failed' + error.statusText);
                });
        };

        $scope.login = function(user) {
            authenticationService.loginUser(user)
                .then(function(loggedInUser) {
                    notificationService.showInfo('Logged successful');
                    sessionStorage['token'] = loggedInUser.access_token;
                    getCurrentUserInfo();
                    $location.path('/projects');

                }, function(error) {
                    notificationService.showError('Request failed' + error.statusText);
                });
        };

        $scope.register = function(user) {
            authenticationService.registerUser(user)
                .then(function(loggedInUser) {
                    notificationService.showInfo('Logged successful');
                    sessionStorage['token'] = loggedInUser.access_token;
                    getCurrentUserInfo();
                    $location.path('/projects');

                }, function(error) {
                    notificationService.showError('Request failed' + error.statusText);
                });
        };

        $scope.logout = function() {
            userService.logOut()
                .then(function() {
                    notificationService.showInfo('Logout successfully');
                    sessionStorage.clear();
                    $location.path('/');

                }, function(error) {
                    notificationService.showError('Request failed' + error.statusText);
                })
        }
}]);