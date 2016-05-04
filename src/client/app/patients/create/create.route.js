(function () {
    'use strict';

    angular
        .module('app.patients.create')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'patients.create',
                config: {
                    url: '/create',
                    templateUrl: 'app/patients/create/create.html',
                    controller: 'PatientsCreateController',
                    controllerAs: 'vm',
                    title: 'Patients Create'
                }
      }
    ];
    }
})();
