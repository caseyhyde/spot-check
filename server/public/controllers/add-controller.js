spotCheckApp.controller('AddSpotController', [ '$http', function($http) {
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

  self.addSpot = function() {
    event.preventDefault();

    $http({
      method: 'POST',
      url: '/addSpot',
      data: self.newSpot
    }).then(function() {
      console.log('New spot added to db successfully!');
      self.newSpot = {};
    }).catch(function(err) {
      console.log('POST error sending new spot to server: ', err);
    });
  }



}]);//end controller
