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
    .when('/confirmSpot/confirmationKey/:key', {
      templateUrl: 'views/templates/confirm.html',
      controller: 'ConfirmController',
      controllerAs: 'confirm'
    })
    .when('/checkEmail', {
      templateUrl: 'views/templates/checkEmail.html',
      controller: 'CheckEmailController',
      controllerAs: 'email'
    })
    .otherwise({
      redirectTo: '/search'
    })
}]);//End router
