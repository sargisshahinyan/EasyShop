/**
 * Created by Sargis on 8/19/2016.
 */
angular.module("myApp.controllers")
    .controller("OrdersCtrl", ["$rootScope", "$scope", "ordersSvc", "itemsSvc", function ($rootScope, $scope, ordersSvc, itemsSvc) {
        $scope.delete = function (id) {
            ordersSvc.deleteOrder(id).then(function () {
                get();
            });
        };

        $scope.add = function () {
            ordersSvc.addOrder({
                item: $scope.item,
                quantity: $scope.quantity
            }).then(function () {
                $scope.item = $scope.quantity = "";
                get();
            });
        };

        get();

        function get() {
            ordersSvc.getOrders().then(function (result) {
                $scope.items = result.data || [];
            });
        }
    }]);