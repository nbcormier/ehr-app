(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger) {
        var vm = this;
        vm.news = {
            title: 'ehrApp',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.patients = [];
        vm.patientSearch = true;
        vm.title = 'Dashboard';
        vm.now = moment();

        activate();

        function activate() {
            var promises = [getMessageCount(), getPatients()];
            return $q.all(promises).then(function () {
                logger.info('Activated Dashboard View');
            });
        }

        function getMessageCount() {
            return dataservice.getMessageCount().then(function (data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

        function getPatients() {
            return dataservice.getPatients().then(function (data) {
                vm.patients = data;
                return vm.patients;
            });
        }

        vm.addToQueue = function (patient) {
            dataservice.addOfficeQueue(patient).then(function (data) {
                logger.info('Added ' + patient.firstName + ' to office queue');
            });
        };
    }
})();
