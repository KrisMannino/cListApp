var ng = angular
;(function(){
  'use strict';

  ng.module('CListApp', ['ngRoute', 'firebase'])

  .controller("ResultsController",[ "$scope", "$firebase", "$http", "searchFactory", function($scope, $firebase, $interval, $http, searchFactory) {
    var fbDataRef = new Firebase('https://clistapp.firebaseio.com/');
    var sync = $firebase(fbDataRef);
    var fbObject = sync.$asObject();
    var fbSnapshot = {};

      fbObject.$bindTo($scope, "newData");

      console.log(fbObject);

      var fredSnapshot;
      fbDataRef.once('value', function(dataSnapshot) {
        // store dataSnapshot for use in below examples.
        fbSnapshot = dataSnapshot;
        var fbSnapshotdata = fbSnapshot.val();
        // data will now contain an object like:
        // { name: { first: 'Fred', last: 'Flintstone' }, rank: 1000 }.
        console.log(fbSnapshotdata);

        fbSnapshot.forEach(function(fbSearch) {
          var key = fbSearch.val();
          var id = fbSearch.key();
          var searchKey = key.keyword.term;
          var fbUpdateData;
          console.log(searchKey);
          console.log(id);

          /*$scope.fbUpdateData = $scope.searchFactory.searchAgain(searchKey);
          console.log(fbUpdateData);*/

          //sync.$update(fbUpdateData)
        })
      })
  }
])








  .controller ('SearchController',[ "$scope", "$http", "$firebase", function($scope, $http, $firebase){

   var myDataRef = new Firebase('https://clistapp.firebaseio.com/');
    var sync = $firebase(myDataRef);
    var profileObject = sync.$asObject();

    profileObject.$bindTo($scope, "data");

    $scope.searchWord= function(){
      var newData = [];
      var theWord = $scope.NewSearch.term;
      var url = 'http://search.3taps.com?auth_token=11a2ac1d6fd4d8a9dcbd221445790888&retvals=images,price,heading,location&heading='+theWord+'&rpp=20&has_image1'
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


}
])

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
