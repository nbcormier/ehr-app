(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger', '$filter', 'moment', 'models'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger, $filter, moment, models) {
        var vm = this;
        vm.patients = [];
        vm.selected = '';
        vm.feed = [];
        
        vm.title = 'Dashboard';

        vm.queue = {
            welcomed: {
                data: [],
                config: {
                    group: {
                        name: 'welcomeQueue',
                        pull: true,
                        put: ['welcomeQueue', 'preExamQueue', 'examQueue', 'completeQueue']
                    },
                    onAdd: function(e) {
                        var visit = e.model;
                        visit.timeStamp = moment();
                        visit.status = 'welcomed';
                        createEvent(visit);
                        dataservice.updateQueue(visit).then(getQueue());
                    }
                }
            },
            preExam: {
                data: [],
                config: {
                    group: {
                        name: 'preExamQueue',
                        pull: true,
                        put: ['welcomeQueue', 'preExamQueue', 'examQueue', 'completeQueue']
                    },
                    onAdd: function(e) {
                        var visit = e.model;
                        visit.timeStamp = moment();
                        visit.status = 'preExam';
                        createEvent(visit);
                        dataservice.updateQueue(visit).then(getQueue());
                    }
                }
            },
            exam: {
                data: [],
                config: {
                    group: {
                        name: 'examQueue',
                        pull: true,
                        put: ['welcomeQueue', 'preExamQueue', 'examQueue', 'completeQueue']
                    },
                    onAdd: function(e) {
                        var visit = e.model;
                        visit.timeStamp = moment();
                        visit.status = 'exam';
                        createEvent(visit);
                        dataservice.updateQueue(visit).then(getQueue());
                    }
                }
            },
            complete: {
                data: [],
                config: {
                    group: {
                        name: 'completeQueue',
                        pull: true,
                        put: ['welcomeQueue', 'preExamQueue', 'examQueue', 'completeQueue']
                    },
                    onAdd: function(e) {
                        var visit = e.model;
                        visit.timeStamp = moment();
                        visit.status = 'complete';
                        createEvent(visit);
                        dataservice.updateQueue(visit).then(getQueue());
                    }
                }
            }
        }

        activate();

        function activate() {
            var promises = [getPatients(), getQueue(), getFeed()];
            return $q.all(promises).then(function () {
                logger.info('Activated Dashboard View');
            });
        }

        function getPatients() {
            return dataservice.getPatients().then(function (data) {
                vm.patients = data;
                return vm.patients;
            });
        }
        
        function getQueue() {
            return dataservice.getQueue().then(function (data) {
                for(var state in data){
                    vm.queue[state].data = data[state];
                }
                return vm.queue;
            });
        }
        
        function getFeed() {
            return dataservice.getFeed().then(function (data) {
                vm.feed = data;
                return vm.feed;
            });
        }
        
        vm.onSelect = function ($item, $model, $label, $event) {
            vm.selected = '';
            var visit = {};
            visit.patient = $item;
            visit.timeStamp = moment();
            visit.status = 'welcomed';
            createEvent(visit);
            return dataservice.updateQueue(visit).then(getQueue());
        };

        vm.findPatient = function (keyword) {
            return $filter('filter')(vm.patients, {
                '$': keyword
            });
        };
        
        function createEvent(visit){
            var event = new models.Event(visit.timeStamp, 'Admin', visit.patient.firstName + ' ' + visit.patient.lastName + ' has been moved to ' + visit.status + ' state');
            event.add().then(getFeed());
        }
    }
})();
