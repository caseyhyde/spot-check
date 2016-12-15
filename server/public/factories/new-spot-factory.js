spotCheckApp.factory('SpotFactory', ['$http', 'multipartForm', function($http,
  multipartForm) {

  var spot = {

    spotData: {},
    image: {
      base64: "",

    },

    setSpotData: function(newSpotData) {
      spot.spotData = newSpotData;
      setImage();
      // setImage(); //This is done just for a preview...
    },

    clearSpotData: function() {
      spot.spotData = {};
      spot.image = "";
    },


    submitSpot: function() {
      console.log("submit function hit");
      console.log(spot.spotData);
      var uploadUrl = '/addSpot/test';
      console.log("Sending this data to the server: ", spot.spotData);

      return multipartForm.post(uploadUrl, spot.spotData);
    }



  } //end spot object

  return spot;

  //convert image file to base64 to display preview
  function setImage() {
    var file = spot.spotData.file;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      spot.image.base64 = e.target.result;
      console.log("File reader finished...");
    }
  }

  //create a new Image to determine width and height of image
  // function createImage() {
  //   setImage();
  //
  //   var _URL = window.URL || window.webkitURL;
  //   spot.image.image = new Image();
  //   spot.image.image.onload = function() {
  //     alert(this.width + " " + this.height);
  //   };
  //   spot.image.image.src = _URL.createObjectURL(spot.spotData.file);
  //   console.log("createImage() function hit in new-spot-factory. spot.image: ", spot.image);
  // }

}]);
