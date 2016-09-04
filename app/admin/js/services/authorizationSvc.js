/**
 * Created by Sargis on 8/9/2016.
 */
angular.module("myApp.services", []).factory("authorizationSvc", ["$http", "$q", "$cookies", "$rootScope", function ($http, $q, $cookies, $rootScope) {
    return {
        signIn: function(login, password, remember) {
            return $http({
                method: "POST",
                url: "/store/SignIn/admin/",
                data: {
                    login: login,
                    password: password,
                    remember: remember
                }
            });
        },
        checkAdmin: function () {
            return $http({
                method: "POST",
                url: "/store/check/admin/",
                data: {
                    code: $rootScope.__lid
                }
            });
        },
        getRememberedAdmin: function () {
            if(!$cookies.get("__cid")) {
                return $q(function (resolve) {
                    resolve();
                });
            }

            return $http({
                method: "POST",
                url: "/store/check/cookie/",
                data: {
                    code: $cookies.get("__cid")
                }
            });
        },
        rememberAdmin: function(code) {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 30);

            $cookies.put("__cid", code, { expires: expireDate });
        },
        logOut: function () {
            $rootScope.__lid = null;
            $cookies.remove("__cid");
            return $q(function (resolve) {
                resolve();
            });
        },
        setAdmin: function (admin) {
            $rootScope.__lid = admin.LoginID;
            $rootScope.Name = admin.Name;

            return $q(function (resolve) {
                resolve();
            });
        }
    };
}]);