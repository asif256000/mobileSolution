angular.module("mobilesolution", ['ui.router', 'satellizer', 'ngMaterial'])
    .run(['$rootScope', '$state', '$stateParams', '$timeout', '$window',
        function($rootScope, $state, $stateParams, $timeout, $window) {

        }])

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider,
                      $httpProvider){

        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state("main", {
                url: "/",
                templateUrl: "partials/main.html",
                controller: "mainController",
            })
            .state("main.Shop", {
                url: "shop",
                templateUrl: "partials/main.shop.html",
                controller: "mainShopController",
            })

    })
