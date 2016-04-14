(function () {
    'use strict';

    var app = angular.module('issueTrackerSystem', ['ngRoute']);

    app.config(['$routeProvider', function($routeProvider) {
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

    app.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net');
}());