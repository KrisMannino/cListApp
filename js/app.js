(function() {

  'use strict';
  //  $httpProvider.defaults.headers.post['My-Header']='11a2ac1d6fd4d8a9dcbd221445790888'
  angular.module('CListApp', ['ngRoute'])
  .config(function($httpProvider) {
    $httpProvider.defaults.headers.post['X-CSRFToken'] = '11a2ac1d6fd4d8a9dcbd221445790888]';
  });
  angular.module('CListApp', ['ngRoute'])

  .controller ('SearchController', function($scope, $http){
    $scope.searchrecord = [{ term: "what"}];


    $scope.searchTerm = function(){
      $scope.searchrecord.push({
        term: $scope.NewSearch.term

      });
      console.log("searchTerm fired");

      $scope.addNewTerm = function(){
        $http.post('https://clistapp.firebaseio.com/.json', $scope.NewSearch)
        .success(function(data){


          $scope.searchrecord[data.term]=$scope.NewSearch;

        })
        .error(function(err){
          alert(err);

        });
      };$scope.addNewTerm();
      console.log('addNewTerm fired');

      $scope.searchWord= function(){

        var newData = {};
        var theWord = $scope.NewSearch.term;
        var url = 'http://search.3taps.com?auth_token=11a2ac1d6fd4d8a9dcbd221445790888&heading='+theWord+'&rpp=20'

        //https://3taps-search-3taps.p.mashape.com/?auth_token=11a2ac1d6fd4d8a9dcbd221445790888&count=20&retvals=heading&rpp=60

        function getJSONP(url, cbName){
          var $script = document.createElement('script');
        //  $script.src = url + '?callback=' + cbName;
          document.body.appendChild($script);
        }
        getJSONP(url, 'heading=big bike');
        $http.get(url)
        .success(function(data){
          $scope.newData = data;
          console.log(data);
        })
        .error(function(err){
          console.log(err);
        });
      };
      $scope.searchWord();
      console.log('searchWord fired');


    }

  })
}());
