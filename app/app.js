'use strict';

var issueTrackerSystem = angular.module('issueTrackerSystem', ['ngRoute']);

issueTrackerSystem.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'HomeController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'HomeController'
        })
        .otherwise({redirectTo: '/'})
}]);

issueTrackerSystem.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');