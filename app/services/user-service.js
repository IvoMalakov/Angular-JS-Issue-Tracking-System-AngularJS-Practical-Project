issueTrackerSystem.factory('userService',[
    '$http',
    '$q',
    'BASE_URL',
    function($http, $q, BASE_URL) {

        function getCurrentUser() {
            var defferd = $q.defer(),

                request = {
                    method: 'GET',
                    url: BASE_URL + 'Users/me',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    defferd.resolve(response.data);
                }, function(error) {
                    defferd.reject(error);
                });

            return defferd.promise;
        }

        function getAllUsers() {
            var defferd = $q.defer(),

                request = {
                    method: 'GET',
                    url: BASE_URL + 'Users/',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    defferd.resolve(response.data);
                }, function(error) {
                    defferd.reject(error);
                });

            return defferd.promise;
        }

        function makeAdmin(id) {
            var defferd = $q.defer(),

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
                    defferd.resolve(response.data);
                }, function(error) {
                    defferd.reject(error);
                });

            return defferd.promise;
        }

        function changePassword(user) {
            var defferd = $q.defer(),

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
                    defferd.resolve(response.data);
                }, function(error) {
                    defferd.reject(error);
                });

            return defferd.promise;
        }

        function logOut() {
            var defferd = $q.defer(),

                request = {
                    method: 'POST',
                    url: BASE_URL + 'api/Account/Logout',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage['token']
                    }
                };

            $http(request)
                .then(function(response) {
                    defferd.resolve(response.data);
                }, function(error) {
                    defferd.reject(error);
                });

            return defferd.promise;
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