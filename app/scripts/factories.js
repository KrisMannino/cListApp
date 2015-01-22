(function() {

  'use strict';
  angular.module('CListApp')

  .factory ('searchFactory', function(){
    var factory = {};
    var anyWord = "hope";

    factory.searchAgain= function(searchKey){
      //var newData = [];
      var theWord = searchKey;
      var url = 'http://search.3taps.com?auth_token=11a2ac1d6fd4d8a9dcbd221445790888&retvals=images,price,heading,location&heading='+theWord+'&rpp=20&has_image1'
      function getJSONP(url, cbName){
        var $script = document.createElement('script');
        document.body.appendChild($script);
      }
      $http.get(url)
      .success(function(data){

        console.log(data);
        /*$scope.newData = data;
        $scope.newData.keyword = $scope.NewSearch;
        myDataRef.push($scope.newData);
        console.log($scope.newData);*/
      })
      .error(function(err){
        console.log(err);
      });
      return data;
    };

    return factory;
  })





}());
