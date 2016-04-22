'use strict';

issueTrackerSystem.controller('HomeController', [
    '$scope',
    '$location',
    '$window',
    'authenticationService',
    'authorizationService',
    'notificationService',
    'userService',
    function($scope, $location, $window, authenticationService, authorizationService, notificationService, userService) {

        var getCurrentUserInfo = function() {
            userService.getCurrentUser()
                .then(function(currentUser) {
                    sessionStorage['userName'] = currentUser.Username;
                    sessionStorage['userId'] = currentUser.Id;
                    sessionStorage['isAdmin']= currentUser.isAdmin;

                    $scope.currentUser = currentUser;
                    $scope.username = currentUser.Username;
                    $location.path('/projects');

                }, function(error) {
                    notificationService.showError('Request failed' + error.statusText);
                });
        };

        $scope.userData = authorizationService;

        $scope.login = function login(user) {
            authenticationService.loginUser(user)
                .then(function(loggedInUser) {
                    notificationService.showInfo('Logged successful');
                    sessionStorage['token'] = loggedInUser.access_token;
                    getCurrentUserInfo();

                }, function(error) {
                    notificationService.showError('Request failed' + error.statusText);
                });
        };

        $scope.register = function register(user) {
            authenticationService.registerUser(user)
                .then(function(loggedInUser) {
                    notificationService.showInfo('Logged successful');
                    $scope.login(user);

                }, function(error) {
                    notificationService.showError('Request failed' + error.statusText);
                });
        };
}]);