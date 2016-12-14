spotCheckApp.controller('AddController', ['SpotFactory', '$http',
'$location', function(SpotFactory, $http, $location) {
  console.log('Add Controller is running');
  var self = this;

  self.newSpot = {
    spotName: "",
    streetAddress: "",
    city: "",
    state: "",
    notes: ""
    //files: [FileList]
  };

  populateFields();

  function populateFields() { //populate fields with data already
    //in new-spot-factory. Needed for going review-controller => add-controller
    console.log("Populating fields from new-spot-factory.");
    self.newSpot = SpotFactory.spotData;
  }

  self.reviewSpot = function() {
    console.log("Spot data being sent to new-spot-factory: ", self.newSpot);
    console.log("newSpot.files.length: ", self.newSpot.files.length);
    SpotFactory.setSpotData(self.newSpot);
  }




}]);//end controller
