issueTrackerSystem.directive('priorityDirective', function() {
    return {
        restrict: 'A',
        templateUrl: 'views/templates/priority-template.html',
        controller: 'ProjectDetailController'
    }
});