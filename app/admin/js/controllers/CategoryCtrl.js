/**
 * Created by Sargis on 8/21/2016.
 */
angular.module("myApp.controllers")
    .controller("CategoryCtrl", ["$rootScope", "$scope", "$routeParams", "categoriesSvc", function ($rootScope, $scope, $routeParams, categoriesSvc) {
        $scope.editMode = false;

        $scope.new = {
            name: null
        };

        categoriesSvc.getCategory($routeParams.id).then(function (result) {
            var firm = result.data;

            $scope.name = firm.Category;
        });

        $scope.editCategory = function () {
            $scope.new.name = $scope.name;

            $scope.editMode = true;
        };

        $scope.deleteCategory = function () {
            categoriesSvc.deleteCategory($routeParams.id).then(function () {
                $location.path("/categories");
            });
        };

        $scope.cancelEditing = function () {
            $scope.editMode = false;
        };

        $scope.submitEditing = function (data) {
            categoriesSvc.editCategory({
                id: $routeParams.id,
                category: data.name
            }).then(function (result) {
                var firm = result.data;

                $scope.name = firm.Category;

                $scope.cancelEditing();
            });
        };
    }]);