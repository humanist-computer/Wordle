'use strict';

describe('Service: folders', function () {

  // load the service's module
  beforeEach(module('wordleApp'));

  // instantiate service
  var folders;
  beforeEach(inject(function (_folders_) {
    folders = _folders_;
  }));

  it('should do something', function () {
    expect(!!folders).toBe(true);
  });

});
