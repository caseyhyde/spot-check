spotCheckApp.controller('ConfirmController', ['$route', '$http', '$location',
function($route, $http, $location) {
  var key = $route.current.params.key;
  console.log(key); // log the confirmation key

  var self = this;

  self.spot = {
    info: {},
    images: {
      bucket: "",
      urls: []
    }
  };

  getMatchingSpot();

  function getMatchingSpot() {
    $http({
      method: 'GET',
      url: '/confirmSpot',
      headers: {
        key: key
      }
    }).then(function(response) {
      console.log("response: ", response);
      self.spot.info = response.data[0].info;
      self.spot.images.bucket = response.data[0].images.bucket;
      self.spot.images.urls = response.data[0].images.urls;
      console.log("self.spot: ", self.spot);
    }).catch(function() {
      console.log("Error in confirmSpot route to server");
    })
  };

  self.confirmSpot = function() {
    $http({
      method: 'POST',
      url: '/confirmSpot',
      data: self.spot,
    }).then(function(response) {
      console.log("confirmSpot response: ", response);
      $location.path('/search');
    }).catch(function(err) {
      console.log("error confirming spot: ", err);
    })
  };

}]);
