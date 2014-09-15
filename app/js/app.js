(function() {
  var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).config([
    '$routeProvider', function($routeProvider) {
      $routeProvider.when('/list', {
        templateUrl: 'partials/partial1.html',
        controller: 'UsersListCtrl'
      });
      $routeProvider.when('/user/:index', {
        templateUrl: 'partials/partial2.html',
        controller: 'EditCtrl'
      });
      $routeProvider.when('/new', {
        templateUrl: 'partials/partial2.html',
        controller: 'NewCtrl'
      });
      $routeProvider.when('/delete/:index', {
        templateUrl: 'partials/partial2.html',
        controller: 'DeleteCtrl'
      });
      return $routeProvider.otherwise({
        redirectTo: '#/'
      });
    }
  ]);

}).call(this);


(function() {
  angular.module('myApp.controllers', [])
  .controller('UsersListCtrl', ['$http', '$scope', function($http, $scope) {
  //загрузка списка из файла, используем сервис
    $scope.users = Users.getAll();
 
    $rootScope.$on('users:updated', function() {
        $scope.users = Users.getAll();
    });
    $scope.confirm = function(user) {
        var title = 'Confirm';
        var msg = 'Вы действительно хотите удалить этого пользователя?';
        var btns = [{result:'no', label: 'No'}, {result:'yes', label: 'Yes', cssClass: 'btn-danger'}];
 
        $dialog.messageBox(title, msg, btns)
            .open()
            .then(function(result){
                if (result === 'yes') {
                    $scope.delete(user);
                }
            });
    };
 
    $scope.delete = function(user) {
        Places.delete(user);
    };
 
    $scope.show = function(user) {
        $rootScope.$broadcast('user:show', user);
    };	
  }])
  
  .controller('EditCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  //Данные по одному пользователю
	$scope.user = $scope.users[$routeParams.index]
	$scope.index = $routeParams.index;
  }])

  .controller('NewCtrl', function($scope, $location, $routeParams) {
 //Добавить пользователя (для администратора)
	var user = {
		id: 'new123@mail.com',
		pwd: 'qwerty',
		name: 'New user',
		roles: ['guest']
	};
	Users.add(user);
  })
  
  .controller('DeleteCtrl', function($scope, $location, $routeParams) {
  //Удалить пользователя (для администратора)
	Users.delete($scope.users[$routeParams.index]);
  });
  
  
	  
}).call(this);

(function() {
  angular.module('myApp.directives', []).directive('appVersion', [
    'version', function(version) {
      return function(scope, elm, attrs) {
        return elm.text(version);
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('myApp.filters', []).filter('interpolate', [
    'version', function(version) {
      return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('myApp.services', []).value('version', '0.1');
  
  angular.factory('Users', ['$http', '$rootScope', function($http, $rootScope) {

    var users = [];

    function getUsers() {
        $http({method: 'GET', url: 'api/users'})
            .success(function(data, status, headers, config) {
                users = data;
                $rootScope.$broadcast('users:updated');
            })
            .error(function(data, status, headers, config) {
                console.log(data);
            });
    }
    getUsers();

    var service = {};

    service.getAll = function() {
        return users;
    }

    service.get = function(id) {
        var user = null;
        angular.forEach(users, function(value) {
            if (parseInt(value.id) === parseInt(id)) {
                user = value;
                return false;
            }
        });
        return user;
    }

    service.add = function(user) {
        $http({method: 'POST', url: 'api/users', data: user})
            .success(function(data, status, headers, config) {
                users.push(data);
                $rootScope.$broadcast('user:added', data);
            })
            .error(function(data, status, headers, config) {
                $rootScope.$broadcast('user:error', data);
            });
    }

    service.update = function(user) {
        $http({method: 'PUT', url: 'api/users/' + user.id, data: user})
            .success(function(data, status, headers, config) {
                $rootScope.$broadcast('user:updated', data);
            })
            .error(function(data, status, headers, config) {
                $rootScope.$broadcast('user:error', data);
            });
    }

    service.delete = function(user) {
        $http({method: 'DELETE', url: 'api/users/' + user.id})
            .success(function(data, status, headers, config) {
                angular.forEach(users, function(value, i) {
                    if (parseInt(value.id) === parseInt(user.id)) {
                        users.splice(i, 1);
                        return false;
                    }
                });
                $rootScope.$broadcast('user:deleted', data);
            })
            .error(function(data, status, headers, config) {
                $rootScope.$broadcast('user:error', data);
            });
    }

    service.save = function(user) {
        if (undefined !== user.id && parseInt(user.id) > 0) {
            service.update(user);
        }
        else {
            service.add(user);
        }
    }

    return service;
}]);

}).call(this);