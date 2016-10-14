/**
 * Created by Sargis on 8/22/2016.
 */
angular.module("myApp.controllers")
    .controller("ItemCtrl", ["$scope", "$rootScope", "$routeParams", "$q", "$location", "itemsSvc", "categoriesSvc", "firmsSvc", function ($scope, $rootScope, $routeParams, $q, $location, itemsSvc, categoriesSvc, firmsSvc) {
        $scope.editMode = false;

        $scope.new = {};

        itemsSvc.getItem($routeParams.id).then(function (result) {
            var item = result.data;

            setItem(item);
        });

        categoriesSvc.getCategories().then(function (result) {
            $scope.categories = result.data || null;
        });

        firmsSvc.getFirms().then(function (result) {
            $scope.firms = result.data || null;
        });

        $scope.editItem = function () {
            $scope.new.name = $scope.name;
            $scope.new.category = $scope.categoryID;
            $scope.new.firm = $scope.firmID;
            $scope.new.measurementUnit = $scope.measurementUnit;
            $scope.new.salePrice = $scope.salePrice;
            $scope.new.quantity = $scope.quantity;

            $scope.editMode = true;
        };

        $scope.deleteItem = function () {
            itemsSvc.deleteItem($routeParams.id).then(function () {
                $location.path("/items");
            });
        };

        $scope.cancelEditing = function () {
            $scope.editMode = false;
        };

        $scope.submitEditing = function (data) {
            data.id = $routeParams.id;

            itemsSvc.editItem(data).then(function (result) {
                var item = result.data;

                setItem(item);

                $scope.cancelEditing();
            });
        };

        function setItem(item) {
            $q.all([categoriesSvc.getCategory(item.CategoryID), firmsSvc.getFirm(item.FirmID)]).then(function (result) {
                $scope.category = result[0].data.Category;
                $scope.firm = result[1].data.Name;
                $scope.name = item.Name;
                $scope.quantity = item.Quantity;
                $scope.salePrice = item.SalePrice;
                $scope.measurementUnit = item.MeasurementUnit;
                $scope.firmID = item.FirmID;
                $scope.categoryID = item.CategoryID;
            });
        }
    }]);