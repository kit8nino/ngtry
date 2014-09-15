'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('myApp.controllers'));

   describe('UsersListCtrl', function(){
    var scope, ctrl, http, $httpBackend;

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service in order to avoid a name conflict.
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('users/users.json').
          respond([{id: 'stepan123@email.com'}, {id: 'ivan321@email.com'}, {id: 'spamer666@turbomail.tw'}]);

      scope = $rootScope.$new();
	  http = $http.$new();
      ctrl = $controller('UsersListCtrl', {$http: http, $scope: scope});
   }));

	it('should create full list of users', inject(function() {
		expect(scope.users).toBeUndefined();
		$httpBackend.flush();

		expect(scope.users).toEqual([{id: 'stepan123@email.com'}, {id: 'ivan321@email.com'}, {id: 'spamer666@turbomail.tw'}]);
	}));

	it('should ....', inject(function() {
    //spec body
	}));
	});
});