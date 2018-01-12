angular.module("mobilesolution").controller('mainShopController',
              ['$scope','$state', '$rootScope','ShopService',
              function($scope, $state, $rootScope, ShopService){
                console.log('Main Home Controller');
                  $scope.slected_Publisher = ""
                  $scope.slected_Order = ""
                  $scope.sortReverse = false
                  $scope.faviconhover = false
                  $scope.ShopService=ShopService
                  ShopService.getNews()

}])
