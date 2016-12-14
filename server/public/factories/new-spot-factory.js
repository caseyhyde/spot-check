spotCheckApp.factory('SpotFactory', ['$http', 'multipartForm', '$location',
'$rootScope', function($http,
  multipartForm, $location, $rootScope) {

  var spot = {

    spotData: {},
    images: {},


    setSpotData: function(newSpotData) {
      spot.spotData = newSpotData; //this will have all spot data including file blobs in an array called .files
      createImages(newSpotData.files); //sends spot data to create images function
      //to create base64 and new Image properties
    },

    clearSpotData: function() {
      spot.spotData = {};
      spot.image = "";
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
  function formatData(image, i) {
    console.log("Running make format() on ", image);
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function(e) {
      console.log("Reader on load happened!");
      spot.images["image" + i] = {};
      spot.images["image" + i].base64 = e.target.result;
      // makeNewImage(image, i);
      console.log("spot.images after formatData(): ", spot.images);
      $location.path('/review');
      $rootScope.$apply();

    }
  }

  // function makeNewImage(image, i) {
  //   var _URL = window.URL || window.webkitURL;
  //   spot.images["image" + i].newImage = new Image();
  //   spot.images["image" + i].newImage.onload = function() {
  //     alert("width: " + this.width + " " + "Height: " + this.height);
  //   };
  //   spot.images["image" + i].src = _URL.createObjectURL(image);
  //   console.log("createImage() function hit in new-spot-factory. spot.image: " );
  // }

  //create a new Image to determine width and height of image
  function createImages(images) {
    console.log("Images: ", images);

    for(var i = 0; i < images.length; i++) { //loop through all images
      var currentImage = images[i]; //create variable for current img
      formatData(currentImage, i); //run that image through setImage to
      //create base64

    }
  }

}]);
