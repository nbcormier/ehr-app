/* jshint -W117, -W030 */
describe('patients routes', function () {
    describe('state', function () {
        var view = 'app/patients/patients.html';

        beforeEach(function () {
            module('app.patients', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function () {
            $templateCache.put(view, '');
        });

        it('should map state patients to url /patients ', function () {
            expect($state.href('patients', {})).to.equal('/patients');
        });

        it('should map /patients route to patients View template', function () {
            expect($state.get('patients').templateUrl).to.equal(view);
        });

        it('of patients should work with $state.go', function () {
            $state.go('patients');
            $rootScope.$apply();
            expect($state.is('patients'));
        });
    });
});
