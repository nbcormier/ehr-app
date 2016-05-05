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

        activate();

        function activate() {
            var promises = [];
            return $q.all(promises).then(function () {
                logger.info('Activated Exam View');
            });
        }
    }
})();
