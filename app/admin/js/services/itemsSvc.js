/**
 * Created by Sargis on 8/21/2016.
 */
angular.module("myApp.services")
    .factory("itemsSvc", ["$http", function ($http) {
        return {
            getItem: function (id) {
                return $http({
                    method: "GET",
                    url: "/store/items/" + id
                });
            },
            getItems: function () {
                return $http({
                    method: "GET",
                    url: "/store/items/"
                });
            },
            createItem: function (item) {
                return $http({
                    method: "POST",
                    url: "/store/items/",
                    data: {
                        name: item.name,
                        firm: +item.firm,
                        salePrice: item.salePrice,
                        category: +item.category,
                        measurementUnit: item.measurementUnit
                    }
                });
            },
            editItem: function (item) {
                return $http({
                    method: "PUT",
                    url: "/store/items/" + item.id,
                    data: {
                        action: "edit",
                        name: item.name,
                        firm: item.firm,
                        salePrice: item.salePrice,
                        category: item.category,
                        measurementUnit: item.measurementUnit,
                        quantity: item.quantity
                    }
                });
            },
            deleteItem: function (id) {
                return $http({
                    method: "DELETE",
                    url: "/store/items/" + id
                });
            },
            addItem: function (item) {
                return $http({
                    method: "PUT",
                    url: "/store/items/" + item.id,
                    data: {
                        action: "add",
                        quantity: item.quantity,
                        unitPrice: item.unitPrice
                    }
                });
            }
        };
    }]);