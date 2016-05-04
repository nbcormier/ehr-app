(function () {
    'use strict';

    angular
        .module('app.patients.create')
        .controller('PatientsCreateController', PatientsCreateController);

    PatientsCreateController.$inject = ['$q', 'dataservice', 'logger', '$state', '$stateParams'];
    /* @ngInject */
    function PatientsCreateController($q, dataservice, logger, $state, $stateParams) {
        var vm = this;
        var id = '';
        vm.patient = {};
        vm.title = 'Create Patient';

        activate();

        function activate() {
            logger.info('Activated Admin View');
        }

        vm.createPatient = function () {
            dataservice.createPatient(vm.patient).then(function (data) {
                logger.info('Added ' + vm.patient.firstName + ' to patients database');
            });
        };
    }
})();
