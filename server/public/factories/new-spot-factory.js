spotCheckApp.factory('SpotFactory', ['$http', 'multipartForm', function($http,
  multipartForm) {

  var spot = {

    spotData: {},
    images: {
      base64: "",

    },

    setSpotData: function(newSpotData) {
      spot.spotData = newSpotData;
      createImage();
      // setImage(); //This is done just for a preview...
    },

    clearSpotData: function() {
      spot.spotData = {};
      spot.image = "";
    },

    addSpot: function() {
      return $http({
        method: 'POST',
        url: '/addSpot',
        data: spot.spotData,
      }).then(function() {
        console.log('New spot added to db successfully!');
        spot.spotData = {};
      }).catch(function(err) {
        console.log('POST error sending new spot to server: ', err);
      });
    },


    submitSpot: function() {
      console.log("submit function hit");
      console.log(spot.spotData);
      var uploadUrl = '/addSpot/test';

      return multipartForm.post(uploadUrl, spot.spotData);
    }



  } //end spot object

  return spot;

  //convert image file to base64 to display preview
  function setImage() {
    var file = spot.spotData.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      spot.images.base64 = e.target.result;
    }
  }

  //create a new Image to determine width and height of image
  function createImage() {
    setImage();

    var _URL = window.URL || window.webkitURL;
    spot.images.image = new Image();
    spot.images.image.onload = function() {
      alert(this.width + " " + this.height);
    };
    spot.images.image.src = _URL.createObjectURL(spot.spotData.files[0]);
    console.log("spot.image: ", spot.images);
  }

}]);
