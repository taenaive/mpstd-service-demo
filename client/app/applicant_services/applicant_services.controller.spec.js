'use strict';

describe('Controller: ApplicantServicesCtrl', function () {

  // load the controller's module
  beforeEach(module('mpstdServiceDemoApp'));

  var ApplicantServicesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ApplicantServicesCtrl = $controller('ApplicantServicesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
