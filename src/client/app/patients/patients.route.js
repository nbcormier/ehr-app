(function () {
    'use strict';

    angular
        .module('app.patients')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'patients',
                config: {
                    url: '/patients',
                    templateUrl: 'app/patients/patients.html',
                    controller: 'PatientsController',
                    controllerAs: 'vm',
                    title: 'Patients',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-user"></i> Patients'
                    }
                }
      }
    ];
    }
})();
