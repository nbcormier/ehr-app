(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('models', models);

    models.$inject = ['$http', '$q', 'exception', 'logger', 'dataservice'];
    /* @ngInject */
    function models($http, $q, exception, logger, dataservice) {
        var service = {
            Event: Event
        };

        function Event(timeStamp, creator, text) {
            this.timeStamp = timeStamp;
            this.creator = creator;
            this.text = text;
        }

        Event.prototype.add = function () {
            return dataservice.updateFeed(this);
        };

        return service;
    }
})();
