(function() {

  'use strict';
  angular.module('CListApp', ['ngRoute'])

  .controller ('SearchController', function($scope, $http){

  $scope.getSearches = function(){
    $http.get('https://clistapp.firebaseio.com/.json', $scope.newData)
    .success(function(data){
      $scope.newData = data;


      // return $scope.newData;
    })
    .error(function(err){
      alert(err);
    });
  };$scope.getSearches();

})
}());
