'use strict';

describe('Service: commonFactory', function () {

  // load the service's module
  beforeEach(module('mpstdServiceDemoApp'));

  // instantiate service
  var commonFactory;
  beforeEach(inject(function (_commonFactory_) {
    commonFactory = _commonFactory_;
  }));

  it('should do something', function () {
    expect(!!commonFactory).toBe(true);
  });

});
