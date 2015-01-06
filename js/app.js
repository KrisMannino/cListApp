(function() {

  'use strict';
  //  $httpProvider.defaults.headers.post['My-Header']='11a2ac1d6fd4d8a9dcbd221445790888'
  angular.module('CListApp', ['ngRoute'])
  .config(function($httpProvider) {
  });
  angular.module('CListApp', ['ngRoute'])

  .controller ('SearchController', function($scope, $http){
    $scope.searchrecord = [{ term: "what",
                             results: ""
                          }];


    $scope.searchTerm = function(){
      $scope.searchrecord.unshift({
        term: $scope.NewSearch.term,
        

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
        var url = 'http://search.3taps.com?auth_token=11a2ac1d6fd4d8a9dcbd221445790888&retvals=images,heading,location&heading='+theWord+'&rpp=&has_image1'
        function getJSONP(url, cbName){
            var $script = document.createElement('script');
            document.body.appendChild($script);
          }
          $http.get(url)
          .success(function(data){
            $scope.newData = data;

            $http.post('https://clistapp.firebaseio.com/.json', $scope.NewSearch)
            .success(function(data){
              $scope.searchrecord[data.results]=$scope.newData;
            })
            .error(function(err){
              alert(err);
            });

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
