/**
 * Created by Sargis on 8/22/2016.
 */
angular.module("myApp.controllers")
    .controller("FirmCtrl", ["$scope", "$rootScope", "$routeParams", "$location", "firmsSvc", function ($scope, $rootScope, $routeParams, $location, firmsSvc) {
        $scope.editMode = false;

        $scope.new = {
            name: "",
            manager: "",
            phone: ""
        };

        firmsSvc.getFirm($routeParams.id).then(function (result) {
            var firm = result.data;

            $scope.name = firm.Name;
            $scope.manager = firm.Manager;
            $scope.phone = firm.Phone;
        });

        $scope.editFirm = function () {
            $scope.new.name = $scope.name;
            $scope.new.manager = $scope.manager;
            $scope.new.phone = $scope.phone;

            $scope.editMode = true;
        };

        $scope.deleteFirm = function () {
            firmsSvc.deleteFirm($routeParams.id).then(function () {
                $location.path("/firms");
            });
        };

        $scope.cancelEditing = function () {
            $scope.editMode = false;
        };

        $scope.submitEditing = function (data) {
            firmsSvc.editFirm({
                id: $routeParams.id,
                name: data.name,
                manager: data.manager,
                phone: data.phone
            }).then(function (result) {
                var firm = result.data;

                $scope.name = firm.Name;
                $scope.manager = firm.Manager;
                $scope.phone = firm.Phone;

                $scope.cancelEditing();
            });
        };
    }]);