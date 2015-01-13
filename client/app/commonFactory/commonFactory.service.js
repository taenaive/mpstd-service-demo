'use strict';

angular.module('mpstdServiceDemoApp')
  .factory('commonFactory', function ($http) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      getApplicant: function(applicantId){
            if(applicantId){
              return $http.get('/api/soap_factory/applicant?id='+applicantId);
            }else{
            return{};
            }
          },
      retrieveAckRequest: function( data ){
        if(data){
              return $http.get('/api/soap_factory/retrieveAckRequest?id='+data);
            }else{
            return{};
            }
      },
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
