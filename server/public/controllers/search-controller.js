spotCheckApp.controller('SearchController', ['$http', function($http) {
  console.log('Search controller is running');

  var self = this;

  self.searchFields = {};
  self.searchResults = [];


  self.searchSpots = function() {
    $http({
      method: 'GET',
      url: '/searchSpots',
      headers: {
        zip: self.searchFields.zip
      }
    }).then(function(response) {
      console.log(response.data);
      self.searchResults = response.data;
    }).catch(function() {
      console.log("There are no spots in that zipcode");
    })
  }



}]);//end controller
