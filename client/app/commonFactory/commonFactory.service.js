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
              //console.log(data);
              return $http.post('/api/soap_factory/retrieveAckRequest',{msg:data});
            }else{
            return{};
            }
      },
      medicalPreScreen: function( svc_type, data ){
        if(data){
            var  end_point;
            switch(svc_type) {
              case 'med' : end_point = '/api/soap_factory/medicalPreScreen' ;
                           break;
              case 'medCreate' : end_point = '/api/soap_factory/medicalPreScreenCreate';
                            break;
              case 'bpiRetrive' : end_point = '/api/soap_factory/bpiRetrive';
                            break;
              case 'bpiSync' : end_point = '/api/soap_factory/bpiSync';
                            break;
              case 'docRetrieve' : end_point = '/api/soap_factory/docRetrieve';
                            break;
              case 'docUpload' : end_point = '/api/soap_factory/docUpload';
                            break;
              case 'medicalExam' : end_point = '/api/soap_factory/medicalExam';
                            break;
              default : return {};
            }
            
            return $http.post(end_point,{msg:data});
          }else{
            return{};
          }
      },
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
