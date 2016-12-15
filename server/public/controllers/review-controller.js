spotCheckApp.controller('ReviewController', ['SpotFactory', '$location',
'$rootScope', function(SpotFactory, $location, $rootScope) {
  console.log('Review Controller is running!');

  var self = this;
  self.spotData = {};

  getSpotData();

  function getSpotData() { //Get spot data from SpotFactory
    self.spotData = SpotFactory.spotData;
    self.images = SpotFactory.images;
    console.log("Spot data received from new-spot-factory: ", self.spotData);
    console.log("Image data received from new-spot-factory: ", self.images);
    // $location.path('/review');
  }

  // function loadImage() {
  //   self.images = SpotFactory.images;
  //   if()
  // }

  self.confirmSpot = function() {
    SpotFactory.submitSpot().then($location.path('/search'));
  }



}]);
