spotCheckApp.controller('ReviewController', ['SpotFactory', '$location',
function(SpotFactory, $location) {
  console.log('Review Controller is running!');

  var self = this;
  self.spotData = {};

  getSpotData();

  function getSpotData() { //Get spot data from SpotFactory
    self.spotData = SpotFactory.spotData;
    self.images = SpotFactory.images;
    console.log("Spot data received from new-spot-factory: ", self.spotData);
    console.log("Image data received from new-spot-factory: ", self.images);
  }


  self.confirmSpot = function() {
    SpotFactory.submitSpot().then($location.path('/checkEmail'));
  }



}]);
