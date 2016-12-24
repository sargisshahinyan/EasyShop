/**
 * Created by Sargis on 12/24/2016.
 */

angular.module("myApp.filters", [])
    .filter("filterByCategory", function () {
        return function (items, categoryID) {
            if(!items || !categoryID) {
                return items;
            }

            return items.filter(function (item) {
                return item.CategoryID == categoryID;
            });
        }
    });