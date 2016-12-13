spotCheckApp.factory('SpotFactory', ['$http', 'multipartForm', function($http,
  multipartForm) {

  var spot = {

    spotData: {},

    image: "",

    setSpotData: function(newSpotData) {
      spot.spotData = newSpotData;
      setImage(); //This is done just for a preview...
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
    var file = spot.spotData.file;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      spot.image = e.target.result;
    }
  }

}]);
