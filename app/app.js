'use strict';

var issueTrackerSystem = angular.module('issueTrackerSystem', ['ngRoute']);

issueTrackerSystem.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/welcome.html'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'HomeController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'HomeController'
        })
        .when('/projects', {
            templateUrl: 'views/projects.html',
            controller: 'DashboardController'
        })
        .when('/profile/password', {
            templateUrl: 'views/user-profile.html'
        })
        .when('/logout', {
            templateUrl: 'views/logout.html',
            controller: 'UserController'
        })
        .otherwise({redirectTo: '/'})
}]);

issueTrackerSystem.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');