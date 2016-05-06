(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger) {
        var service = {
            createPatient: createPatient,
            getPatient: getPatient,
            getPatients: getPatients,
            getMessageCount: getMessageCount,
            getQueue: getQueue,
            updateQueue: updateQueue,
            updateFeed: updateFeed,
            getFeed: getFeed
        };

        return service;

        function getMessageCount() {
            return $q.when(72);
        }

        function createPatient(patient) {
            return $http.post('/api/patients/create', patient)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for createPatient')(e);
            }
        }

        function getPatient(id) {
            return $http.get('/api/patient/' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getPatient')(e);
            }
        }

        function getPatients() {
            return $http.get('/api/patients')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getPatients')(e);
            }
        }

        function getQueue() {
            return $http.get('/api/office/queue')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getOfficeQueue')(e);
            }
        }

        function updateQueue(visit) {
            return $http.post('/api/office/queue/update', visit)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for updateQueue')(e);
            }
        }

        function getFeed() {
            return $http.get('/api/office/feed')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getFeed')(e);
            }
        }

        function updateFeed(event) {
            return $http.post('/api/office/feed/update', event)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for updateFeed')(e);
            }
        }

    }
})();
