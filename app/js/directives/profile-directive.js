issueTrackerSystem.directive('profileDirective', function() {
    return {
        restrict: 'A',
        templateUrl: 'views/templates/userProfile-template.html',
        controller: 'CommonController'
    }
});