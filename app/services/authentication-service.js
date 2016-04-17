'use strict';

issueTrackerSystem.factory('authenticationService', [
    '$http',
    '$q',
    'BASE_URL',
    function($http, $q, BASE_URL) {

        function registerUser(registerUser) {
            var deffered = $q.defer(),

                userEmail = registerUser.userEmail,
                password = registerUser.userPassword,
                confirmPassword = registerUser.userConfirmPassword,

                request = {
                    method: 'POST',
                    url: BASE_URL + 'api/Account/Register',
                    data: {
                        'Email': userEmail,
                        'Password' : password,
                        'ConfirmPassword': confirmPassword
                    },
                    headers: {
                        ContentType: 'application/x-www-form-urlencoded'
                    }
                };

            $http(request)
                .then(function(response) {
                    console.log(response.data);
                    deffered.resolve(response.data);
                }, function(error) {
                    deffered.reject(error);
                });

            return deffered.promise;
        }

        function loginUser(loginUser) {
            var deffered = $q.defer(),
                userEmail = loginUser.userEmail,
                password = loginUser.userPassword,

                request = {
                    method: 'POST',
                    url: BASE_URL + 'api/Token',
                    data: 'grant_type=password&username=' + userEmail + '&password=' + password,
                    headers: {
                        ContentType: 'application/x-www-form-urlencoded'
                    }
                };

            $http(request)
                .then(function(response) {
                    deffered.resolve(response.data);
                }, function(error) {
                    deffered.reject(error);
                });

            return deffered.promise;
        }

        return {
            loginUser: loginUser,
            registerUser: registerUser
        }
    }
]);