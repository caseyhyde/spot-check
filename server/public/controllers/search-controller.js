spotCheckApp.controller('SearchController', ['$http', function($http) {
  console.log('Search controller is running');

  var self = this;

  self.searchFields = {};
  self.searchResults = [];


  self.searchSpots = function() {
    console.log("Search Fields: ", self.searchFields);
    $http({
      method: 'GET',
      url: '/searchSpots',
      headers: {
        keywords: self.searchFields.keywords,
        zip: self.searchFields.zip
      }
    }).then(function(response) {
      self.searchResults = response.data;
    }).catch(function() {
      console.log("There are no spots in that zipcode");
    })
  }



}]);//end controller
