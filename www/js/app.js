// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('starter', ['ionic']);
myApp.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position("bottom");
});
myApp
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('tabs',{
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'templates/home.html'
        }
      }
    })
    .state('tabs.list', {
      url: '/list',
      views: {
        'list-tab': {
          templateUrl: 'templates/list.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.detail', {
      url: '/list/:aId',
      views: {
        'list-tab': {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      }
    })

    $urlRouterProvider.otherwise('tab/home');
})
.controller('ListController', ['$scope', '$http', '$state', function($scope, $http, $state){
  $http.get('js/data.json').success(function(data){
    $scope.artists = data;
    $scope.whichartist = $state.params.aId;
    $scope.onItemDelete = function(item){
      var deleteItemIndex = $scope.artists.indexOf(item);
      $scope.artists.splice(deleteItemIndex,1);
    };
    $scope.doRefresh = function(){
      $http.get('js/data.json').success(function(data){
        $scope.artists = data;
        // 
        $scope.$broadcast('scroll.refreshComplete');
      });
    };
    $scope.toggleStar = function(item){
      item.star = !item.star;
    };
    $scope.moveItem = function(item, fromIndex, toIndex){
      $scope.artists.splice(fromIndex, 1);
      $scope.artists.splice(toIndex, 0, item);
    };
  });
}]);