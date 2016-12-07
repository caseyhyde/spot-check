spotCheckApp.factory('SpotFactory', ['$http', function($http) {

  var spotData = {};

  var spot = {


    setSpotData: function(newSpotData) {
      spotData = newSpotData
      console.log(spotData);
    },


    addSpot: function() {
      $http({
        method: 'POST',
        url: '/addSpot',
        data: spotData,
      }).then(function() {
        console.log('New spot added to db successfully!');
      }).catch(function(err) {
        console.log('POST error sending new spot to server: ', err);
      });
    }
  }

  return spot;

}]);
