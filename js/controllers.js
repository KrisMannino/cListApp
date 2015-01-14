var ng = angular
;(function(){
  'use strict';

  ng.module('CListApp', ['ngRoute', 'firebase'])

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
        return newData;
      }



  })

  .controller ('ResultsController', function($scope, $http, $firebase, $interval){

    var myDataRef = new Firebase('https://clistapp.firebaseio.com/');
    var sync = $firebase(myDataRef);
    var ref = new Firebase('https://clistapp.firebaseio.com/');

    myDataRef.on("value", function(snapshot) {

      snapshot.forEach(function(fbSearch) {

        var key = fbSearch.val();
        var id = fbSearch.key();
      console.log(id);
        var searchWord = key.keyword.term;

        console.log(searchWord);

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

            console.log($scope.newData);
          })
          .error(function(err){
            console.log(err);
          });
          return newData;
        }
        $scope.searchAgain(searchWord);*/


      });
      console.log(snapshot);

        }, function (errorObject) {
      console.log("not seeing Fb");
    });



      $interval(function(){

            $http.get('https://clistapp.firebaseio.com/.json')
            .success(function(data){
              $scope.newData = data;
              console.log('checked FB');




            })
            .error(function(err){
              alert(err);
            })
          }, 2000);





  })

  .filter('reverse', function() {
    function toArray(list) {
      var k, out = [];
      if( list ) {
        if( angular.isArray(list) ) {
          out = list;
        }
        else if( typeof(list) === 'object' ) {
          for (k in list) {
            if (list.hasOwnProperty(k)) { out.push(list[k]); }
          }
        }
      }
      return out;
    }
    return function(items) {
      return toArray(items).slice().reverse();
    };
  });

  }());
