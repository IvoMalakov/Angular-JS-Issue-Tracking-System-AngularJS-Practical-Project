'use strict';

issueTrackerSystem.filter('admin', function() {
    return function(input) {
        switch (input) {
            case 'true' :
                return 'Is Admin';
                break;

            case 'false' :
                return 'Is Not Admin';
                break;
        }
    }
});