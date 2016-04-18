issueTrackerSystem.factory('issueService', [
    '$http',
    '$q',
    'BASE_URL',
    function($http, $q, BASE_URL) {

        function getIssuesByProjectId(id) {

        }

        function addIssue(issue) {

        }

        function editIssue(issue, id) {

        }

        function getIssueById(id) {

        }

        function getIssues(priorityName, pageNumber) {

        }

        function getCommentsByIssueId(id) {

        }

        return {
            getIssuesByProjectId: getIssuesByProjectId,
            addIssue : addIssue,
            editIssue : editIssue,
            getIssueById : getIssueById,
            getIssues : getIssues,
            getCommentsByIssueId : getCommentsByIssueId
        }
    }
]);