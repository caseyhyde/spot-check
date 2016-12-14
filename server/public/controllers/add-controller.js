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
  };

  populateFields();

  function populateFields() { //populate fields with data already
    //in new-spot-factory. Needed for going review-controller => add-controller
    self.newSpot = SpotFactory.spotData;
  }

  self.reviewSpot = function() {
    console.log("add.newSpot.files: ", self.newSpot.files);
    SpotFactory.setSpotData(self.newSpot);
    $location.path('/review');
  }




}]);//end controller
