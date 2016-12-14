spotCheckApp.controller('ReviewController', ['SpotFactory', '$location',
function(SpotFactory, $location) {
  console.log('Review Controller is running!');

  var self = this;
  self.spotData = {};

  getSpotData();

  function getSpotData() { //Get spot data from SpotFactory
    self.spotData = SpotFactory.spotData;
    self.image = SpotFactory.image;
    console.log("Spot data received from new-spot-factory: ", self.spotData);
    console.log("Image data received from new-spot-factory: ", self.image);
  }

  // function loadImage() {
  //   self.images = SpotFactory.images;
  //   if()
  // }

  self.confirmSpot = function() {
    SpotFactory.submitSpot().then($location.path('/search'));
  }



}]);
