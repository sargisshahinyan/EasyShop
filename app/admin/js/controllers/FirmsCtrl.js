/**
 * Created by Sargis on 8/21/2016.
 */
angular.module("myApp.controllers")
    .controller("FirmsCtrl", ["$rootScope", "$scope", "firmsSvc", function ($rootScope, $scope, firmsSvc) {
        $scope.deleteFirm = function (id) {
            firmsSvc.deleteFirm(id).then(function () {
                getFirms();
            });
        };

        $scope.addFirm = function () {
            var firm = {};

            firm.name = $scope.firmName;
            firm.manager = $scope.managerName;
            firm.phone = $scope.phone;

            firmsSvc.addFirm(firm).then(function () {
                $scope.firmName = $scope.managerName = $scope.phone = "";
                getFirms();
            });
        };

        getFirms();

        function getFirms() {
            firmsSvc.getFirms().then(function (result) {
                $scope.firms = result.data || [];
            });
        }
    }]);