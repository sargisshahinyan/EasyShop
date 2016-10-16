/**
 * Created by Sargis on 8/21/2016.
 */
angular.module("myApp.controllers")
    .controller("ItemsCtrl", ["$rootScope", "$scope", "itemsSvc", "firmsSvc", "categoriesSvc", function ($rootScope, $scope, itemsSvc, firmsSvc, categoriesSvc) {
        $scope.deleteItem = function (id) {
            itemsSvc.deleteItem(id).then(function () {
                getItems();
            });
        };

        $scope.createItem = function () {
            itemsSvc.createItem({
                id: $scope.ID,
                name: $scope.name,
                firm: $scope.firm,
                salePrice: $scope.salePrice,
                category: $scope.category,
                measurementUnit: $scope.measurementUnit
            }).then(function () {
                $scope.name = $scope.firm = $scope.salePrice = $scope.category = $scope.measurementUnit = "";
                getItems();
            });
        };

        $scope.addItem = function () {
            itemsSvc.addItem({
                id: $scope.addingID,
                quantity: $scope.addingQuantity,
                unitPrice: $scope.addingUnitPrice
            }).then(function (response) {
                $scope.addingID = $scope.addingQuantity = $scope.addingUnitPrice = "";
            });
        };

        categoriesSvc.getCategories().then(function (result) {
            $scope.categories = result.data || null;
        });

        firmsSvc.getFirms().then(function (result) {
            $scope.firms = result.data || null;
        });

        getItems();

        function getItems() {
            itemsSvc.getItems().then(function (result) {
                $scope.items = result.data || [];
            });
        }
    }]);