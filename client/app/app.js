'use strict';

angular.module('mpstdServiceDemoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap'
]).constant('constantUrlQueryStrings', {//borrowed from consult project strings
    //Global strings from Oracle consult request links

          //MP request query strings
          applicantId: 'applicantId',
          mpId: 'practitionerId',
          examId : 'examId',
          Create_c_query_string : 'applicantId&examId&testId&stationId&mepsLocationId&practitionerId',
          
          // ME approve query strings
          consultId: 'consultId',
          meId: 'evaluatorId',
          Me_list_query_string : 'consultId&evaluatorId',

          // both : for consult_selection
          Mix_ins_query_string : 'applicantId&examId&testId&stationId&mepsLocationId&practitionerId&consultId&evaluatorId',

          hostName : "//198.135.15.148:3007"
})
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });