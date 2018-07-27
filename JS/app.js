

var app = angular.module('ProductApp', ['ngMaterial', 'ngMessages', 'ngAnimate'])
    .controller('ctrl', ctrl)
    .controller('DetailsController', DetailsController)
    .service('productService', productService)
    ;
ctrl.$inject = ['$scope', '$q', 'productService', '$mdDialog'];
function ctrl($scope, $q, productService, $mdDialog) {
    $scope.sortCategories = [];

    var deferred = $q.defer();
    var promise = productService.getData();
    promise.then(function (response) {

        $scope.productData = response.data.product;
        // pushing only unqiue categories
        $scope.productData.forEach(eachProductData => {
            if ($scope.sortCategories.indexOf(eachProductData.category) === -1) {
                $scope.sortCategories.push(eachProductData.category);
            }
        });

        console.log($scope.sortCategories);
    }).catch(function (error) {
        console.log('Somethinq went wronq!');
    });



    // to open a modal

    $scope.openDetailsModal = function (ev, eachProductData) {
        $mdDialog.show({
            controller: 'DetailsController',
            templateUrl: 'openDetailsModal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                eachProductData: eachProductData
            }
        })
    }
}

DetailsController.$inject = ['$scope', '$mdDialog', 'eachProductData'];
function DetailsController($scope, $mdDialog, eachProductData) {
    $scope.eachProductData = eachProductData;
    console.log(eachProductData);
    $scope.close = function () {
        $mdDialog.hide();
    }
}

productService.$inject = ['$q', '$http'];
function productService($q, $http) {
    var items = [];
    this.getData = function () {
        var response = $http({
            method: 'GET',
            url: ('JS/data.json')
        });
        return response;
    }
}

