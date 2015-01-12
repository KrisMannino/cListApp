;(function() {

  'use strict';
  angular.module('CListApp', ['ngRoute'])

  .factory ('craigslistFactory', function($scope, $http){
    var factory = {};
    var newData = {};

    factory.searchWord= function(){
      var newData = {};
      var theWord = $scope.NewSearch.term;
      var url = 'http://search.3taps.com?auth_token=11a2ac1d6fd4d8a9dcbd221445790888&retvals=images,heading,location&heading='+theWord+'&rpp=&has_image1'
      function getJSONP(url, cbName){
        var $script = document.createElement('script');
        document.body.appendChild($script);
      }
      $http.get(url)
      .success(function(data){
        $scope.newData = data;
        $scope.newData.keyword = $scope.NewSearch;

        console.log($scope.newData);
      })
      .error(function(err){
        console.log(err);
      });
      return newData;
    }

    return factory;


})
.factory ('getFBFactory', function($scope, $http){
  var factory = {};
  var newData = {};
    factory.getFB = function(){
      $http.get('https://clistapp.firebaseio.com/.json')
      .success(function(data){
        $scope.newData = data;
        console.log($scope.newData);
        return newData;
      })
      .error(function(err){
        alert(err);
      });
      return factory;
    }
  })

}());
