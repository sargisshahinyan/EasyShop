/**
 * Created by Sargis on 8/17/2016.
 */
angular.module("myApp.services").factory("categoriesSvc", ["$http", "$rootScope" , function ($http, $rootScope) {
    return {
        addCategory: function (category) {
            return $http({
                method: "POST",
                url: "/store/categories/",
                data: {
                    category: category
                }
            });
        },
        editCategory: function (category) {
            return $http({
                method: "PUT",
                url: "/store/categories/" + category.id,
                data: {
                    category: category.category
                }
            });
        },
        getCategories: function (pageNumber) {
            return $http({
                method: "GET",
                url:"/store/categories/"
            });
        },
        deleteCategory: function (id) {
            return $http({
                method: "DELETE",
                url: "/store/categories/" + id
            });
        },
        getCategory: function (id) {
            return $http({
                method: "GET",
                url: "/store/categories/" + id
            });
        }
    };
}]);