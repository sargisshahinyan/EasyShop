/**
 * Created by Sargis on 8/19/2016.
 */
angular.module("myApp.services")
    .factory("ordersSvc", ["$http", "$rootScope", function ($http, $rootScope) {
        return {
            getOrder: function (id) {
                return $http({
                    url: "/store/orders/" + id,
                    method: "GET"
                });
            },
            getOrders: function () {
                return $http({
                    url: "/store/orders/",
                    method: "GET"
                });
            },
            addOrder: function (order) {
                return $http({
                    url: "/store/orders/",
                    method: "POST",
                    data: {
                        item: order.item,
                        quantity: order.quantity
                    }
                });
            },
            editOrder: function (order) {
                return $http({
                    url: "/store/orders/" + order.id,
                    method: "PUT",
                    data: {
                        item: order.item,
                        quantity: order.quantity,
                        state: order.state
                    }
                });
            },
            deleteOrder: function (id) {
                return $http({
                    url: "/store/orders/" + id,
                    method: "DELETE"
                });
            }
        };
    }]);