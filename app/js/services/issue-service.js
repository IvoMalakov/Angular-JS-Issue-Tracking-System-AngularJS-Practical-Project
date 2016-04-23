issueTrackerSystem.factory('issueService', [
    '$http',
    '$q',
    'BASE_URL',
    'pageSize',
    function($http, $q, BASE_URL, pageSize) {

        function getMyIssues(pageNumber) {
            var deferred = $q.defer(),
                request = {
                    method: 'GET',
                    url: BASE_URL + 'issues/me?orderBy=DueDate desc, IssueKey&pageSize=' + pageSize + '&pageNumber=' + pageNumber,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getIssuesByProjectId(id) {
            var deferred = $q.defer(),
                request = {
                    method: 'GET',
                    url: BASE_URL + 'Projects/' + id + '/Issues',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function addIssue(issue) {
            var deferred = $q.defer(),
                request = {
                    method: 'POST',
                    url: BASE_URL + 'Issues/',
                    data: issue,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function editIssue(issue, id) {
            var deferred = $q.defer(),
                request = {
                    method: 'PUT',
                    url: BASE_URL + 'Issues/' + id,
                    data: issue,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getIssueById(id) {
            var deferred = $q.defer(),
                request = {
                    method: 'GET',
                    url: BASE_URL + 'Issues/' + id,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getIssues(params) {
            var deferred = $q.defer(),
                request = {
                    method: 'GET',
                    url: BASE_URL + 'issues/?filter=&pageSize=' + pageSize + '&pageNumber=' + params.pageNumber,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getCommentsByIssueId(id) {
            var deferred = $q.defer(),
                request = {
                    method: 'GET',
                    url: BASE_URL + 'Issues/' + id + '/Comments',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;

        }

        function addComment(text, id) {
            var deferred = $q.defer(),
                request = {
                    method: 'POST',
                    url: BASE_URL + 'Issues/' + id + '/Comments',
                    data: {
                        text: text
                    },
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        return {
            getMyIssues: getMyIssues,
            getIssuesByProjectId: getIssuesByProjectId,
            addIssue : addIssue,
            editIssue : editIssue,
            getIssueById : getIssueById,
            getIssues : getIssues,
            getCommentsByIssueId : getCommentsByIssueId,
            addComment: addComment
        }
    }
]);