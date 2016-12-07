spotCheckApp.controller('AddSpotController', ['$http', 'SpotFactory', function($http, SpotFactory) {
  console.log('Add a Spot controller is running');
  var self = this;

  self.newSpot = {
    spotName: "",
    address: {
      streetAddress: "",
      city: "",
      state: ""
    },
    details: {
      notes: "",
    }
  };

  self.reviewSpot = function() {
    event.preventDefault();
    SpotFactory.setSpotData(self.newSpot);
    SpotFactory.addSpot();
  }






}]);//end controller
