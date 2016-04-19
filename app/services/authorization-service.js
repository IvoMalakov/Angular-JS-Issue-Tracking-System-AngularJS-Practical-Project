'use strict';

issueTrackerSystem.factory('authorizationService', [function() {

    function getLoggedUser() {
        return sessionStorage['userName'];
    }

    return {
        getLoggedUser: getLoggedUser
    }
}]);