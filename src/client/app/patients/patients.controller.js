(function () {
    'use strict';

    angular
        .module('app.patients')
        .controller('PatientsController', PatientsController);

    PatientsController.$inject = ['$q', '$filter', 'dataservice', 'logger', '$state'];
    /* @ngInject */
    function PatientsController($q, $filter, dataservice, logger, $state) {
        var vm = this;
        vm.title = 'Patients';
        vm.patients = [];
        vm.selected = '';

        activate();

        function activate() {
            var promises = [getPatients()];
            return $q.all(promises).then(function () {
                logger.info('Activated Patients View');
            });
        }

        function getPatients() {
            return dataservice.getPatients().then(function (data) {
                vm.patients = data;
                return vm.patients;
            });
        }

        vm.onSelect = function ($item, $model, $label, $event) {
            vm.selected = '';
            $state.go('patients.details', {
                'id': $item.id
            });
        };

        vm.findPatient = function (keyword) {
            return $filter('filter')(vm.patients, {
                '$': keyword
            });
        };
    }
})();
