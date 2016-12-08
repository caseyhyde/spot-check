spotCheckApp.controller('SearchController', ['$http', 'SearchFactory', '$location',
 function($http, SearchFactory, $location) {
  console.log('Search controller is running');

  var self = this;

  self.searchFields = {};
  self.searchResults = [];




  function updateFactoryFields() {
    SearchFactory.updateFactoryData(self.searchFields);
  }

  self.searchSpots = function() {
    updateFactoryFields();
    SearchFactory.searchSpots().then(function(data) {
      SearchFactory.updateFactoryResults(data);
      $location.path('/results');
    })
  };





}]);//end controller
