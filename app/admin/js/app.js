// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    "myApp.controllers",
    "myApp.services",
    "myApp.directives",
    "myApp.filters"
]).
config(['$routeProvider', "$httpProvider", function($routeProvider, $httpProvider) {
  var resolve = {
    check: function (authorizationSvc, $location) {
      return authorizationSvc.checkAdmin().error(function () {
        $location.path('/main');
      });
    }
  };

  $routeProvider.when('/main', {
    templateUrl: "admin/templates/main.html",
    controller:"MainCtrl",
    resolve: {
      check: function(authorizationSvc, $location, $rootScope) {
        authorizationSvc.getRememberedAdmin().then(function (result) {
          var admin = result.data;

          authorizationSvc.setAdmin(admin).then(function () {
            $rootScope.isMain = false;
            $location.path("/home");
          });
        });
      }
    }
  }).when('/home', {
    templateUrl: "admin/templates/home.html",
    controller:"HomeCtrl",
    resolve: resolve
  }).when('/categories/:id', {
    templateUrl: "admin/templates/categories.html",
    controller:"CategoriesCtrl",
    resolve: resolve
  }).when('/orders', {
      templateUrl: "admin/templates/orders.html",
      controller:"OrdersCtrl",
      resolve: resolve
  }).when('/order/:id', {
      templateUrl: "admin/templates/order.html",
      controller:"OrderCtrl",
      resolve: resolve
  }).when('/category/:id', {
    templateUrl: "admin/templates/category.html",
    controller:"CategoryCtrl",
    resolve: resolve
  }).when('/firms', {
    templateUrl: "admin/templates/firms.html",
    controller:"FirmsCtrl",
    resolve: resolve
  }).when('/firm/:id', {
    templateUrl: "admin/templates/firm.html",
    controller:"FirmCtrl",
    resolve: resolve
  }).when('/items', {
    templateUrl: "admin/templates/items.html",
    controller:"ItemsCtrl",
    resolve: resolve
  }).when('/item/:id', {
    templateUrl: "admin/templates/itemDet.html",
    controller:"ItemCtrl",
    resolve: resolve
  }).otherwise({redirectTo: '/main'});



  // Используем x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  // Переопределяем дефолтный transformRequest в $http-сервисе
  $httpProvider.defaults.transformRequest = [function(data)
  {
    /**
     * рабочая лошадка; преобразует объект в x-www-form-urlencoded строку.
     * @param {Object} obj
     * @return {String}
     */
    var param = function(obj)
    {
      var query = '';
      var name, value, fullSubName, subValue, innerObj, i;

      for(name in obj)
      {
        value = obj[name];

        if(value instanceof Array)
        {
          for(i=0; i<value.length; ++i)
          {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value instanceof Object)
        {
          for(subName in value)
          {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value !== undefined && value !== null)
        {
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
      }

      return query.length ? query.substr(0, query.length - 1) : query;
    };

    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
}]).run(["$rootScope", "authorizationSvc", "$location", function ($rootScope, authorizationSvc, $location) {
    $rootScope.logOut = function () {
      authorizationSvc.logOut().then(function () {
        $location.path("/main");
      });
    }
}]);