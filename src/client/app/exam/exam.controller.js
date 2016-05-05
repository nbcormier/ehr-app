(function () {
    'use strict';

    angular
        .module('app.exam')
        .controller('ExamController', ExamController);

    ExamController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function ExamController($q, dataservice, logger) {
        var vm = this;
        vm.title = 'Exam';

        vm.officeQueue = [];

        activate();

        function activate() {
            var promises = [getOfficeQueue()];
            return $q.all(promises).then(function () {
                logger.info('Activated Exam View');
            });
        }

        function getOfficeQueue() {
            return dataservice.getOfficeQueue().then(function (data) {
                vm.officeQueue = data;
                return vm.officeQueue;
            });
        }
    }
})();
