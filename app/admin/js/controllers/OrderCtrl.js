/**
 * Created by Sargis on 8/22/2016.
 */
angular.module("myApp.controllers")
    .controller("ItemCtrl", ["$rootScope", "$scope", "ordersSvc", "itemsSvc","categoriesSvc", "$q", function ($rootScope, $scope, ordersSvc, itemsSvc, categoriesSvc, $q) {
        var state, itemID;

        $scope.editMode = false;
        $scope.ready = false;

        $scope.new = {};

        $q.all([ordersSvc.getOrder($routeParams.id), categoriesSvc.getCategories(), itemsSvc.getItems()]).then(function (result) {
            var order = result[0].data;

            $scope.categories = result[1].data || [];
            $scope.items = result[2].data || [];

            setOrder(order);
        });

        $scope.editOrder = function () {
            $scope.new.name = $scope.name;
            $scope.new.category = $scope.categoryID;
            $scope.new.firm = $scope.firmID;
            $scope.new.measurementUnit = $scope.measurementUnit;
            $scope.new.salePrice = $scope.salePrice;
            $scope.new.quantity = $scope.quantity;

            $scope.editMode = true;
        };

        $scope.deleteOrder = function () {
            ordersSvc.deleteItem($routeParams.id).then(function () {
                $location.path("/items");
            });
        };

        $scope.cancelEditing = function () {
            $scope.editMode = false;
        };

        $scope.submitEditing = function (data) {
            data.id = $routeParams.id;

            ordersSvc.editOrder(data).then(function (result) {
                var item = result.data;

                setOrder(item);

                $scope.cancelEditing();
            });
        };

        function setOrder(order) {
            $scope.quantity = order.Quantity;
            $scope.categoryID = order.CategoryID;
            $scope.date = order.Date;
            $scope.item = order.ItemName;
            $scope.state = order.IsDelivered ? "Delivered" : "Not delivered";

            state = order.IsDelivered;
            itemID = order.ItemID;
        }
    }]);