(function () {
    'use strict';

    angular
        .module('app.exam')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'exam',
                config: {
                    url: '/exam',
                    
                    templateUrl: 'app/exam/exam.html',
                    controller: 'ExamController',
                    controllerAs: 'vm',
                    title: 'Exam',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-eye"></i> Exam'
                    }
                }
      }
    ];
    }
})();
