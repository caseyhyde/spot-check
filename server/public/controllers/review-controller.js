spotCheckApp.controller('ReviewController', ['SpotFactory', '$location',
function(SpotFactory, $location) {
  console.log('Review Controller is running!');

  var self = this;

  getSpotData();

  function getSpotData() { //Get spot data from SpotFactory
    self.spotData = SpotFactory.spotData;
    self.image = SpotFactory.image;
    console.log("spotData: ", self.spotData);
  }

  self.confirmSpot = function() {
    SpotFactory.submitSpot();
    // .then($location.path('/search'));
    self.spotData = {};
  }



}]);
