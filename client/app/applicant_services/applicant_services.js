'use strict';

angular.module('mpstdServiceDemoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('applicant_services', {
        url: '/applicant_services',
        templateUrl: 'app/applicant_services/applicant_services.html',
        controller: 'ApplicantServicesCtrl',
        authenticate: true
      });
  });