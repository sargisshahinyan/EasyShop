/**
 * Created by Sargis on 8/19/2016.
 */
angular.module("myApp.services")
    .factory("ordersSvc", ["$http", function ($http) {
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
            getOrderByItem:function (itemID) {
                return $http({
                    method: "GET",
                    url:"/store/orders/",
                    params: {
                        "itemID": itemID,
                        "state" : 0
                    }
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