(function () {
    'use strict';

    angular.module('app', [
    'app.core',
    'app.widgets',
    'app.admin',
    'app.dashboard',
    'app.patients',
    'app.patients.details',
    'app.patients.create',
    'app.exam',
    'app.layout'
  ]);
  
    angular.module('app').config(['$httpProvider',function($httpProvider) {
      $httpProvider.interceptors.push(function(){
         return {
              request: function(config){
                  if(config.url.indexOf('app/') > -1){
                      var cacheBust = Date.now().toString();
                      var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                      config.url = config.url + separator + 'c=' + cacheBust;
                  }

                  return config;
              } 
         };
         
      });

    }]);


})();
