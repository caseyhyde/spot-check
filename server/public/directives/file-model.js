// spotCheckApp.directive('fileModel', ['$parse', function($parse) {
//   return {
//     restrict: 'A',//restrict to attribute
//     link: function(scope, element, attrs) {
//       var model = $parse(attrs.fileModel);
//       var modelSetter = model.assign;
//       element.bind('change', function() { //when element changes, execute this function
//         scope.$apply(function() {
//           console.log("Images selected: ", element[0].files);
//           modelSetter(scope, element[0].files[0]);
//         });
//       });
//     }
//   };
// }]);//end directive


spotCheckApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var isMultiple = attrs.multiple;
            var modelSetter = model.assign;
            element.bind('change', function () {
              console.log("Element attrs: ", attrs);
                var values = [];
                angular.forEach(element[0].files, function (item) {
                    var value = {
                       // File Name
                        name: "file",
                        //File Size
                        size: item.size,
                        //File URL to view
                        url: URL.createObjectURL(item),
                        // File Input Value
                        _file: item
                    };
                    values.push(value);
                });
                scope.$apply(function () {
                    if (isMultiple) {
                        modelSetter(scope, values);
                    } else {
                        modelSetter(scope, values[0]);
                    }
                });
            });
        }
    };
}]);
