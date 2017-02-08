spotCheckApp.factory('SpotFactory', ['$http', 'multipartForm', function($http,
  multipartForm) {

  var spot = {

    spotData: {},
    images: [],

    setSpotData: function(newSpotData) {
      console.log("factory spot data: ", newSpotData);
      spot.spotData = newSpotData;
      spot.images = [];
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



    for (var i = 0; i < spot.spotData.files.length; i++) {
      var reader = new FileReader();
      var file = spot.spotData.files[i];
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        spot.images.push(e.target.result)
        console.log("File reader finished...", spot.images);
      }
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
