spotCheckApp.service('multipartForm', ['$http', function($http) {
  this.post = function(uploadUrl, data) {
    var fd = new FormData();
    console.log("Multipartform data: ", data);

    //
    // for(var key in data) {
    //   fd.append(key, data[key]);
    //   console.log("fd: ", fd);
    // }
    fd.append('spotName', data.spotName);
    fd.append('streetAddress', data.streetAddress);
    fd.append('city', data.city);
    fd.append('state', data.state);
    fd.append('zip', data.zip);
    fd.append('notes', data.notes);

    for( var i = 0; i< data.files.length ; i++ ){
        fd.append('file' , data.files[i] );
    }

    return $http.post(uploadUrl, fd, { //this is a configuration for the POST
      transformRequest: angular.indentity, //stops angular from serializing our data
      headers: { 'Content-Type': undefined } //lets browser handle what type of data is being sent...
    });
  };//end this.post function expression
}]);


//
// for(var key in data) //
//   fd.append(key, data[key]);

// spotCheckApp.service('multipartForm', ['$http', function ($http) {
//     this.post = function(uploadUrl, file){
//         var fd = new FormData();
//         fd.append('file', file);
//
//
//         return $http.post(uploadUrl, fd, {
//             transformRequest: angular.identity,
//             headers: {'Content-Type': undefined}
//         })
//     }
// }]);
