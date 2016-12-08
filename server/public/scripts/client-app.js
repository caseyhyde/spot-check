var spotCheckApp = angular.module('spotCheckApp', ['ngRoute']);


spotCheckApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/search', {
      templateUrl: '/views/templates/search.html',
      controller: 'SearchController',
      controllerAs: 'search'
    })
    .when('/add', {
      templateUrl: '/views/templates/addspot.html',
      controller: 'AddController',
      controllerAs: 'add'
    })
    .when('/review', {
      templateUrl: '/views/templates/review.html',
      controller: 'ReviewController',
      controllerAs: 'review'
    })
    .when('/results', {
      templateUrl: 'views/templates/results.html',
      controller: 'ResultsController',
      controllerAs: 'results'
    })
    .otherwise({
      redirectTo: '/search'
    })
}]);//End router
