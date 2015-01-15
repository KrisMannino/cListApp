var ng = angular
;(function(){
  'use strict';

  ng.module('CListApp', ['ngRoute', 'firebase'])

  .controller("ResultsController", function($scope, $firebase, $interval, $http) {
    var myDataRef = new Firebase("https://clistapp.firebaseio.com/");
    var sync = $firebase(myDataRef);
    var syncObject = sync.$asObject();

    syncObject.$bindTo($scope, "newData");

    myDataRef.on("value", function(snapshot) {
      console.log(snapshot);

      snapshot.forEach(function(fbSearch) {
        var key = fbSearch.val();
        var id = fbSearch.key();
        console.log(id);
        var searchWord = key.keyword.term;
        console.log(searchWord);
      })
    });


      $scope.searchAgain= function(searchword){
        $interval(function(){
        console.log("searching again");
        var newData = [];
        var theWord = searchword;
        var url = 'http://search.3taps.com?auth_token=11a2ac1d6fd4d8a9dcbd221445790888&retvals=images,heading,location&heading='+theWord+'&rpp=&has_image1'
        function getJSONP(url, cbName){
          var $script = document.createElement('script');
          document.body.appendChild($script);
        }
        $http.get(url)
        .success(function(data){
          $scope.newData = data;
          $scope.newData.keyword = $scope.NewSearch;
/*          myDataRef.push($scope.newData);
*/          console.log($scope.newData);
        })
        .error(function(err){
          console.log(err);
        });

    }, 10000);
  };

  })

  .controller ('SearchController', function($scope, $http, $firebase){

    var myDataRef = new Firebase('https://clistapp.firebaseio.com/');
    var sync = $firebase(myDataRef);
    var profileObject = sync.$asObject();

    profileObject.$bindTo($scope, "data");

    $scope.searchWord= function(){
      var newData = [];
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
        myDataRef.push($scope.newData);
          console.log($scope.newData);
        })
        .error(function(err){
          console.log(err);
        });
      }


})

      /*  $scope.searchAgain= function(word){
          var newData = [];
          var theWord = word;
          var url = 'http://search.3taps.com?auth_token=11a2ac1d6fd4d8a9dcbd221445790888&retvals=images,heading,location&heading='+theWord+'&rpp=&has_image1'
          function getJSONP(url, cbName){
            var $script = document.createElement('script');
            document.body.appendChild($script);
          }
          $http.get(url)
          .success(function(data){
            $scope.newData = data;
            $scope.newData.keyword = $scope.NewSearch;
            myDataRef.set($scope.newData);

          })
          .error(function(err){
            console.log(err);
          });
          return newData;
        }
      });
        }, function (errorObject) {
      console.log("not seeing Fb");
    });

*/
  $('#searchBar').keypress(function(event){
    if(event.keyCode == 13){
      $('#searchButton').click();
    }
  });
  }());
