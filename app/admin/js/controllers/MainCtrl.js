/**
 * Created by Sargis on 8/9/2016.
 */
angular.module('myApp.controllers', []).controller("MainCtrl", ["$rootScope", "$scope", "authorizationSvc", "$cookies", "$location", function($rootScope, $scope, authorizationSvc, $cookies, $location) {
    $rootScope.isMain = true;

    $scope.signIn = function () {
        authorizationSvc.signIn($scope.login, $scope.password, $scope.remember).then(function (result) {
            var data = result.data;

            $scope.errorText = "";

            authorizationSvc.setAdmin(data).then(function () {
                if(data.Cookie) {
                    authorizationSvc.rememberAdmin(data.Cookie);
                }

                $rootScope.isMain = false;
                $location.path("/home");
            });

        }, function () {
            $scope.errorText = "Incorrect Login or Password";
        });
    }
}]);