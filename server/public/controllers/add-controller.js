spotCheckApp.controller('AddController', ['SpotFactory', '$http', function(SpotFactory, $http, multipartForm) {
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
  }

  self.reviewSpot = function() {
    console.log("add.newSpot.file: ", self.newSpot.file);
    SpotFactory.setSpotData(self.newSpot);
  }




}]);//end controller
