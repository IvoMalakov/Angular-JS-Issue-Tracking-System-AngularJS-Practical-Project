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
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController',
            data: {
                requireLogin: true
            }
        })
        .when('/projects', {
            templateUrl: 'views/projects.html',
            controller: 'ProjectsController',
            data: {
                requireLogin: true
            }
        })
        .when('/profile/password', {
            templateUrl: 'views/user-profile.html',
            data: {
                requireLogin: true
            }
        })
        .when('/logout', {
            templateUrl: 'views/logout.html',
            controller: 'UserController',
            data: {
                requireLogin: true
            }
        })
        .when('/issues/:id', {
            templateUrl: 'views/issue-details.html',
            controller: 'IssueController',
            data: {
                requireLogin: true
            }
        })
        .when('/issues/:id/add-issue', {
            templateUrl: 'views/add-issue.html',
            controller: 'AddIssueController',
            data: {
                requireLogin: true
            }
        })
        .when('/issues/:id/edit', {
            templateUrl: 'views/edit-issue.html',
            controller: 'EditIssueController',
            data: {
                requireLogin: true
            }
        })
        .otherwise({redirectTo: '/'})
}]);

issueTrackerSystem.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
issueTrackerSystem.constant('pageSize', 5);

//issueTrackerSystem.run(function($location, $rootScope, authenticationService) {
//    $rootScope.on('$rootChangeStart', function(event, next) {
//        if (!authenticationService.isLoggedUser() && next.data.requireLogin) {
//            $location.path('/');
//        }
//    })
//});