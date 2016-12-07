var spotCheckApp = angular.module('spotCheckApp', ['ngRoute']);

spotCheckApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/search', {
      templateUrl: '/views/templates/search.html',
      controller: 'SearchController',
      controllerAs: 'search'
    })
    .when('/addspot', {
      templateUrl: '/views/templates/addspot.html',
      controller: 'AddSpotController',
      controllerAs: 'add'
    })
}]);//End router
