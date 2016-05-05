(function () {
    'use strict';

    angular
        .module('app.patients.details')
        .controller('PatientsDetailsController', PatientsDetailsController);

    PatientsDetailsController.$inject = ['$q', 'dataservice', 'logger', '$state', '$stateParams', 'moment'];
    /* @ngInject */
    function PatientsDetailsController($q, dataservice, logger, $state, $stateParams, moment) {
        var vm = this;
        var id = '';
        vm.patient = {};
        vm.title = vm.patient.lastName + ', ' + vm.patient.firstName;

        if (angular.isDefined($stateParams.id)) {
            id = $stateParams.id;
        }

        activate();

        function activate() {
            var promises = [getPatient()];
            return $q.all(promises).then(function () {
                logger.info('Activated Patient Details View');
            });
        }

        function getPatient() {
            return dataservice.getPatient(id).then(function (data) {
                vm.patient = data;
                return vm.patient;
            });
        }
    }
})();
