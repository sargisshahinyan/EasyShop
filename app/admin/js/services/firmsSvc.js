/**
 * Created by Sargis on 8/21/2016.
 */
angular.module("myApp.services")
    .factory("firmsSvc", ["$http", "$rootScope", function ($http, $rootScope) {
        return {
            getFirm: function (id) {
                return $http({
                    method: "GET",
                    url: "/store/firm/" + id
                });
            },
            addFirm: function (firm) {
                return $http({
                    method: "POST",
                    url: "/store/firm/",
                    data: {
                        name: firm.name,
                        manager: firm.manager,
                        phone: firm.phone
                    }
                });
            },
            editFirm: function (firm) {
                return $http({
                    method: "PUT",
                    url: "/store/firm/" + firm.id,
                    data: {
                        name: firm.name,
                        manager: firm.manager,
                        phone: firm.phone
                    }
                });
            },
            deleteFirm: function (id) {
                return $http({
                    method: "DELETE",
                    url: "/store/firm/" + id
                });
            },
            getFirms: function () {
                return $http({
                    method: "GET",
                    url: "/store/firm/"
                });
            }
        };
    }]);