spotCheckApp.controller('ReviewController', ['SpotFactory', '$location',
function(SpotFactory, $location) {
  console.log('Review Controller is running!');

  var self = this;
  self.spotData = {};

  getSpotData();

  function getSpotData() { //Get spot data from SpotFactory
    self.spotData = SpotFactory.spotData;
    self.images = SpotFactory.images;
    console.log("spotData: ", self.spotData);
    console.log("Images: ", self.images);
  }

  // function loadImage() {
  //   self.images = SpotFactory.images;
  //   if()
  // }

  self.confirmSpot = function() {
    SpotFactory.submitSpot().then($location.path('/search'));
  }



}]);
