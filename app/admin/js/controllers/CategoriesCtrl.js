/**
 * Created by Sargis on 8/17/2016.
 */
angular.module("myApp.controllers").controller("CategoriesCtrl", ["$rootScope", "$scope", "categoriesSvc", "$routeParams", function($rootScope, $scope, categoriesSvc, $routeParams) {
    $scope.addCategory = function () {
        categoriesSvc.addCategory($scope.newCategory).then(function (result) {
            getCategories();
            $scope.newCategory = "";
        });
    };

    $scope.deleteCategory = function (id) {
        categoriesSvc.deleteCategory(id).then(function () {
            getCategories();
        });
    };

    getCategories();

    function getCategories() {
        categoriesSvc.getCategories($routeParams.id).then(function (result) {
            $scope.categories = result.data || [];
        });
    }
}]);