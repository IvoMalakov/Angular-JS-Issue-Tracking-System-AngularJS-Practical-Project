'use strict';

issueTrackerSystem.factory('notificationService', function() {
    return {
        showInfo: function(message) {
            noty({
                text: message,
                type: 'info',
                layout: 'topCenter',
                timeOut: 1000
            });
        },

        showError: function(message, serverError) {
            noty({
                text: message + '</br>' + serverError,
                type: 'error',
                layout: 'topCenter',
                timeOut: 5000
            })
        }
    }
});