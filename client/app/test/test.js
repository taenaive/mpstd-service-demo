'use strict';

angular.module('mpstdServiceDemoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('test', {
        url: '/test',
        templateUrl: 'app/test/test.html',
        controller: 'TestCtrl',
        authenticate: true
      });
  });