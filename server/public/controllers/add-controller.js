spotCheckApp.controller('AddController', ['SpotFactory', function(SpotFactory) {
  console.log('Add Controller is running');
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

  populateFields();

  function populateFields() {
    self.newSpot = SpotFactory.spotData;
    console.log(SpotFactory);
  }

  self.reviewSpot = function() {
    // event.preventDefault();
    SpotFactory.setSpotData(self.newSpot);
    // SpotFactory.addSpot();
  }






}]);//end controller
