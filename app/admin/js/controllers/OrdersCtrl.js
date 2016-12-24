/**
 * Created by Sargis on 8/19/2016.
 */
angular.module("myApp.controllers")
    .controller("OrdersCtrl", ["$rootScope", "$scope", "ordersSvc", "itemsSvc","categoriesSvc" , function ($rootScope, $scope, ordersSvc, itemsSvc, categoriesSvc) {
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
                $scope.list = result.data || [];
            });
        }

        categoriesSvc.getCategories().then(function (response) {
            $scope.categories = response.data || [];
        });

        itemsSvc.getItems().then(function (response) {
            $scope.items = response.data || [];
        });
    }]);