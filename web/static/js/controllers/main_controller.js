angular.module("mobilesolution").controller('mainController',
              ['$scope','$state', '$rootScope',
              function($scope, $state, $rootScope){

              $state.go("main.Shop")

}])
