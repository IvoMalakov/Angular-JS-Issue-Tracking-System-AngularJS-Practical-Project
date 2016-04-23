'use strict';

issueTrackerSystem.controller('TimeOutController', [
    '$scope',
    '$timeout',
    function($scope, $timeout) {
        var delay = 2000;

        $scope.showWelcomeMessage = true;

        $timeout(function() {
            $scope.showWelcomeMessage = !$scope.showWelcomeMessage;
        }, delay);

    }
]);