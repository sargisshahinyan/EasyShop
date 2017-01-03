/**
 * Created by Sargis on 8/22/2016.
 */
angular.module("myApp.controllers")
    .controller("OrderCtrl", ["$rootScope", "$scope", "ordersSvc", "itemsSvc","categoriesSvc", "$q", "$routeParams", function ($rootScope, $scope, ordersSvc, itemsSvc, categoriesSvc, $q, $routeParams) {
        var state;

        $scope.editMode = false;
        $scope.ready = false;

        $scope.new = {};

        $q.all([ordersSvc.getOrder($routeParams.id), categoriesSvc.getCategories(), itemsSvc.getItems()]).then(function (result) {
            var order = result[0].data;

            $scope.categories = result[1].data || [];
            $scope.items = result[2].data || [];

            setOrder(order);

            $scope.ready = true;
        });

        $scope.editOrder = function () {
            $scope.new.quantity = $scope.quantity;
            $scope.new.date = $scope.date;
            $scope.new.categoryID = $scope.categoryID;
            $scope.new.item = $scope.itemID;
            $scope.new.state = state;

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
                var order = result.data;

                setOrder(order);

                $scope.cancelEditing();
            }, function (result) {
                console.log(result);
            });
        };

        function setOrder(order) {
            $scope.quantity = order.Quantity;
            $scope.date = order.Date;
            $scope.item = order.ItemName;
            $scope.state = +order.IsDelivered ? "Delivered" : "Not delivered";
            $scope.itemID = order.ItemID;

            state = order.IsDelivered;

            $scope.items.some(function (item) {
                if(item.ID == $scope.itemID) {
                    $scope.categoryID = item.CategoryID;
                    return true;
                }
            });
        }
    }]);