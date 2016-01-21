'use strict';

describe('Directive: viewer', function () {

  // load the directive's module and view
  beforeEach(module('wordleApp'));
  beforeEach(module('app/viewer/viewer.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<viewer></viewer>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the viewer directive');
  }));
});
