spotCheckApp.controller('AddController', ['SpotFactory', '$http', function(SpotFactory, $http, multipartForm) {
  console.log('Add Controller is running');
  var self = this;


  self.newSpot = {
    spotName: "",
    streetAddress: "",
    city: "",
    state: "",
    notes: ""
  };

  populateFields();

  function populateFields() { //populate fields with data already
    //in new-spot-factory. Needed for going review-controller => add-controller
    self.newSpot = SpotFactory.spotData;
  }

  self.reviewSpot = function() {
    console.log("add.newSpot.file: ", self.newSpot);
    SpotFactory.setSpotData(self.newSpot);
  }




}]);//end controller
