/**
 * Created by Sargis on 8/21/2016.
 */
angular.module("myApp.services")
    .factory("firmsSvc", ["$http", "$rootScope", function ($http, $rootScope) {
        return {
            getFirm: function (id) {
                return $http({
                    method: "GET",
                    url: "/store/firms/" + id
                });
            },
            addFirm: function (firm) {
                return $http({
                    method: "POST",
                    url: "/store/firms/",
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
                    url: "/store/firms/" + firm.id,
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
                    url: "/store/firms/" + id
                });
            },
            getFirms: function () {
                return $http({
                    method: "GET",
                    url: "/store/firms/"
                });
            }
        };
    }]);