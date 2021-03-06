(function() {

  'use strict';
  angular.module('CListApp', ['ngRoute'])

  .controller ('SearchController', function($scope, $http){

    var myDataRef = new Firebase('https://clistapp.firebaseio.com/');

    $scope.searchrecord = [{ term: "what",
    postings: {}
    }];



    $scope.searchTerm = function(){
      $scope.searchrecord.unshift({
        term: $scope.NewSearch.term,
      });
      console.log("searchTerm fired");

      $scope.getSearches= function(){
        $http.get('https://clistapp.firebaseio.com/clistapp/postings',$scope.newData)
        .success(function(data){
          $scope.newData=data;
          console.log($scope.newData);
          console.log("getSearches");
        })
        .error(function(err){
          alert(err);
        });

      };
      $scope.getSearches();
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
             $scope.newData.keyword = $scope.NewSearch;
             console.log($scope.newData.postings);

               $scope.addNewResults = function(){
                 $http.post('https://clistapp.firebaseio.com/.json', $scope.newData)
                 .success(function(data){
                     $scope.searchrecord[data.results]=$scope.newData;

                    // return $scope.newData;
                 })
                   .error(function(err){
                     alert(err);
                });
           };//$scope.addNewResults();
           console.log('addNewResults fired');

           myDataRef.push($scope.newData);
           console.log($scope.newData);

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
