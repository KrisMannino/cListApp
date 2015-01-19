var ng = angular
;(function(){
  'use strict';

  ng.module('CListApp', ['ngRoute', 'firebase'])

  .config(function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'index.html',
      controller: 'MainController'
    })
    .when('/:id', {
      templateUrl: 'views/results.html',
      controller: 'ShowController',
    })

    .otherwise({redirectTo: '/'});
  })

  .factory('helloFactory', function() {
    return function(name) {
      this.name = name;
      this.hello = function() {
        return "Hello " + this.name;
      };
    };
  })


  .controller("ResultsController",[ "$scope", "$firebase", "$http","helloFactory","$location", "$routeParams", function($scope, $firebase, $interval, $http, helloFactory, $location, $routeParams) {
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
    /*$scope.sayHi = function(){$scope.helloFactory.hello();};
    $scope.sayHi("tony");*/
    $scope.removeContact = function(){
      sync.$remove($scope.id);




      console.log(id);
      $http.get('https://clistapp.firebaseio.com/' + id + '.json')
      .success(function(data){
        this.show = data;
      })
      .error(function(err){
        console.log(err);
      });
    };

  }])

  .controller('ShowController',["$scope", "$firebase","$http","$routeParams","$location", function($http, $routeParams, $scope, $firebase, $location){

  }])







  .controller ('MainController',[ "$scope", "$http", "$firebase", function($scope, $http, $firebase){

   var myDataRef = new Firebase('https://clistapp.firebaseio.com/');
    var sync = $firebase(myDataRef);
    var profileObject = sync.$asObject();

    profileObject.$bindTo($scope, "data");

    $scope.searchWord= function(){
      var newData = [];
      var typedWord = $scope.NewSearch.term;
      console.log(typedWord);

      var replaceFunction = function(word){
      var newWord = word.replace(/\s+/,"&");
      return newWord;
      };
      var theWord = '"'+typedWord+'"';

      console.log(theWord);
      var url = 'http://search.3taps.com?auth_token=11a2ac1d6fd4d8a9dcbd221445790888&retvals=id,images,price,external_url,source,heading,location&heading='+theWord+'&rpp=20&has_image1&location.metro=USA-NAS'
      function getJSONP(url, cbName){
        var $script = document.createElement('script');
        document.body.appendChild($script);
      }
      $http.get(url)
      .success(function(data){
        $scope.newData = data;
        $scope.newData.keyword = $scope.NewSearch;
        $scope.NewSearch="";
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
  })


  }());
