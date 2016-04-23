issueTrackerSystem.factory('userService',[
    '$http',
    '$q',
    'BASE_URL',
    function($http, $q, BASE_URL) {

        function getCurrentUser() {
            var deferred = $q.defer(),

                request = {
                    method: 'GET',
                    url: BASE_URL + 'Users/me',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getAllUsers() {
            var deferred = $q.defer(),

                request = {
                    method: 'GET',
                    url: BASE_URL + 'Users/',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    deferred.resolve(response.data);
                    var users = response.data;
                }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function makeAdmin(id) {
            var deferred = $q.defer(),

                request = {
                    method: 'PUT',
                    url: BASE_URL + 'Users/makeadmin',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage['token']
                    },
                    data: {
                        'UserId' : id
                    }
                };

            $http(request)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function changePassword(user) {
            var deferred = $q.defer(),

                request = {
                    method: 'POST',
                    url: BASE_URL + 'api/Account/ChangePassword',
                    data: user,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function logOut() {
            var deferred = $q.defer(),

                request = {
                    method: 'POST',
                    url: BASE_URL + 'api/Account/Logout',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        return {
            getCurrentUser: getCurrentUser,
            getAllUsers: getAllUsers,
            makeAdmin: makeAdmin,
            changePassword: changePassword,
            logOut: logOut
        }
    }
]);