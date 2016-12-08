spotCheckApp.factory('SpotFactory', ['$http', function($http) {



  var spot = {

    spotData: {},

    setSpotData: function(newSpotData) {
      spot.spotData = newSpotData
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
    }
  }

  return spot;

}]);
