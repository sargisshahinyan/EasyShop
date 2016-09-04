angular.module("myApp.directives", [])
    .directive("phoneInput", function () {
        return {
            restrict: "C",
            link: function (scope, element) {
                element.mask("099-99-99-99");
            }
        }
    });