(function () {
    'use strict';

    angular
        .module('app.patients.details')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'patients.details',
                config: {
                    url: '/details/:id',
                    templateUrl: 'app/patients/details/details.html',
                    controller: 'PatientsDetailsController',
                    controllerAs: 'vm',
                    title: 'Patients Details'
                }
      }
    ];
    }
})();
