spotCheckApp.controller('SearchController', ['$http', 'SearchFactory',
'$location', 'SpotFactory',
function($http, SearchFactory, $location, SpotFactory) {
  console.log('Search controller is running');

  var self = this;

  self.searchFields = {};
  self.searchResults = [];

/****************************************
Empty spot object in SpotFactory, should
user be coming from adding a spot
*****************************************/
  (function clearSpotFactory() {
    SpotFactory.clearSpotData();
  })();


  function updateFactoryFields() {
    SearchFactory.updateFactoryData(self.searchFields);
  }

  self.searchSpots = function() {
    updateFactoryFields();
    SearchFactory.searchSpots().then(function(data) {
      SearchFactory.updateFactoryResults(data);
      $location.path('/results');
    })
  };





}]);//end controller
