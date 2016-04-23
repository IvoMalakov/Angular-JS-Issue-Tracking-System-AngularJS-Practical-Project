'use strict';

issueTrackerSystem.controller('TimeOutController', [
    '$scope',
    '$timeout',
    function($scope, $timeout) {
        var delay = 2000;

        $scope.welcomeMessage = true;

        $timeout(function() {
            $scope.welcomeMessage = false;
        }, delay);

    }
]);