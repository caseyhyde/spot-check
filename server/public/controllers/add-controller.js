spotCheckApp.controller('AddController', ['SpotFactory', '$http',
  'multipartForm', function(SpotFactory, $http, multipartForm) {
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
    console.log("File: ", self.newSpot.myFile);

    // event.preventDefault();
    setImage();
    SpotFactory.setSpotData(self.newSpot);
    // SpotFactory.addSpot();
  }

  function setImage() {
    var file = self.newSpot.myFile;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      self.newSpot.ImageSrc = e.target.result;
    }
  }




}]);//end controller
