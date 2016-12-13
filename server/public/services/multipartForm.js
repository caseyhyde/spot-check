spotCheckApp.service('multipartForm', ['$http', function($http) {
  this.post = function(uploadUrl, data) {
    var fd = new FormData();
    for(var key in data) //
      fd.append(key, data[key]);
    return $http.post(uploadUrl, fd, { //this is a configuration for the POST
      transformRequest: angular.indentity, //stops angular from serializing our data
      headers: { 'Content-Type': undefined } //lets browser handle what type of data is being sent...
    });
  };//end this.post function expression
}]);
