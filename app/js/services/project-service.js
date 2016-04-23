'use strict';

issueTrackerSystem.factory('projectService',[
    '$http',
    '$q',
    'BASE_URL',
    'pageSize',
    function($http, $q, BASE_URL, pageSize) {

        function getAllProjects(params) {
            var deferred = $q.defer(),

                request = {
                    method: 'GET',
                    url: BASE_URL + 'projects/?filter=&pageSize=' + pageSize + '&pageNumber=' + params.pageNumber,
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

        function getAllProjectsByName(name, pageNumber) {
            var deferred = $q.defer(),

            request = {
                method: 'GET',
                url: BASE_URL + 'projects/?filter=Name.contains("' + name + '")&pageSize=' + pageSize + '&pageNumber=' + pageNumber,
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

        function getMyProjects(lead, pageNumber) {
            var deferred = $q.defer(),

                request = {
                    method: 'GET',
                    url: BASE_URL + 'projects/?filter=Lead.Username.contains("' + lead + '")&pageSize=' + pageSize + '&pageNumber=' + pageNumber,
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

        function getProjectById(id) {
            var deferred = $q.defer(),

                request = {
                    method: 'GET',
                    url: BASE_URL + 'Projects/' + id,
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

        function addProject(project) {
            var deferred = $q.defer(),

                request = {
                    method: 'POST',
                    url: BASE_URL + 'projects',
                    data: {
                        'Name': project.Name,
                        'Description' : project.Description,
                        'ProjectKey' : project.ProjectKey,
                        'labels' : project.labels,
                        'priorities' : project.priorities,
                        'LeadId' : project.LeadId
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

        function editProject(project) {
            var deferred = $q.defer(),

                request = {
                    method: 'PUT',
                    url: BASE_URL + 'projects/' + project.Id,
                    data: {
                        'Name': project.Name,
                        'Description' : project.Description,
                        'labels' : project.labels,
                        'priorities' : project.priorities,
                        'LeadId' : project.LeadId
                    },
                    headers: {
                        Authorization: 'Bearer' + sessionStorage['token']
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

        function getAllExistingLabels() {
            var deferred = $q.defer(),

                request = {
                    method: 'GET',
                    url: BASE_URL + 'labels/?filter',
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
            getAllProjects: getAllProjects,
            getAllProjectsByName: getAllProjectsByName,
            getMyProjects: getMyProjects,
            getProjectById: getProjectById,
            addProject: addProject,
            editProject: editProject,
            getAllExistingLabels: getAllExistingLabels
        }
    }
]);