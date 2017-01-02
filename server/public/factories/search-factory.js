spotCheckApp.factory ('SearchFactory', ['$http', function($http) {
  console.log("SearchFactory is running!");

  var searchSpots = {

    searchFields: {},
    searchResults: [],



    updateFactoryData: function(fields) {
      searchSpots.searchFields = fields;
    },

    updateFactoryResults: function(data) {
      searchSpots.searchResults = data;
      console.log("factory result ", searchSpots.searchResults);
    },

    searchSpots: function() {
      console.log("Search Fields: ", searchSpots.searchFields);
      return $http({
        method: 'GET',
        url: '/searchSpots',
        headers: {
          keywords: searchSpots.searchFields.keywords,
          zip: searchSpots.searchFields.zip
        }
      }).then(function(response) {
        return response.data;
      }).catch(function() {
        console.log("There are no spots in that zipcode");
      })
    },



  }//end searchSpots object

  return searchSpots;
}]);//end factory
