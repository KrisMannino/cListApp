var ng = angular
;(function(){
  'use strict';

  ng.module('CListApp')

  .factory('helloFactory', function() {
    return function(name) {
      this.name = name;
      this.hello = function() {
        return "Hello " + this.name;
      };
    };
  })

  .controller('ItemController',[ "$http", "$routeParams", "$firebase", "$location", "$scope",function($http, $routeParams, $firebase, $location, $scope){
    var id = $routeParams.id;
    console.log("the id = "+id);
    var theUrl = "https://clistapp.firebaseio.com/"+ id;
    var ref = new Firebase(theUrl);
    var sync = $firebase(ref);
    var fbSnapshot = {};
/*    var rmUrl = theUrl+"/postings/"+id;
*/    ref.once('value', function(dataSnapshot) {
      fbSnapshot = dataSnapshot;
      var fbPostShot = {};
      $scope.fbPostShot = fbSnapshot.val();
      console.log($scope.fbPostShot);
    })
    var removeItem = function(){
        sync.$remove(id);
        console.log("removing " + id);
/*        $location.path("/");
*/      };

  }])


  .controller("ResultsController",[ "$scope", "$firebase", "$http", "$location", "$routeParams", function($scope, $firebase, $http, $location, $routeParams) {
    var fbDataRef = new Firebase('https://clistapp.firebaseio.com/');
/*    fbDataRef.setWithPriority( keyword );
*/    var sync = $firebase(fbDataRef);
    var fbArray = sync.$asArray();
      $scope.newData = fbArray;

/*    fbObject.$bindTo($scope, "newData");
*/
    $scope.removeItem = function(id){
      sync.$remove(id);
      console.log("removing " + id)
      $location.path("/")
    };
    var fbSnapshot = {};
        fbDataRef.once('value', function(dataSnapshot) {
        fbSnapshot = dataSnapshot;
        var fbSnapshotdata = fbSnapshot.val();

        console.log(fbSnapshotdata);

       fbSnapshot.forEach(function(fbSearch) {
          var key = fbSearch.val();
          var fbId = fbSearch.key();

          var searchKey = key.keyword.term;
          var fbUpdateData;
          /*console.log(searchKey);
          console.log("id "+fbId);*/

        })
      })

    /*$scope.sayHi = function(){$scope.helloFactory.hello();};
    $scope.sayHi("tony");*/
    $scope.removeContact = function(word){
      console.log(word);

      $scope.go = function ( path ) {
        console.log("go to path");
        console.log("this is the path "+path);
   };
      /*sync.$remove($scope.id);
      console.log(id);
      $http.get('https://clistapp.firebaseio.com/' + id + '.json')
      .success(function(data){
        this.show = data;
      })
      .error(function(err){
        console.log(err);
      });*/
    };

  }])
  .controller ('MainController',[ "$scope", "$http", "$firebase", "$location",function($scope, $http, $firebase, $location){

   var myDataRef = new Firebase('https://clistapp.firebaseio.com/');
    var sync = $firebase(myDataRef);
    var profileObject = sync.$asObject();

    profileObject.$bindTo($scope, "data");

    $scope.searchWord= function(){
      var newData = [];
      var typedWord = $scope.NewSearch.term;
      console.log(typedWord);

      var theWord = '"'+typedWord+'"';

      console.log(theWord);
      var url = 'http://search.3taps.com?auth_token=11a2ac1d6fd4d8a9dcbd221445790888&retvals=id,images,price,external_url,source,body,heading,location&heading='+theWord+'&rpp=20&has_image1&location.metro=USA-NAS'
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
        $location.path("/");

    }
  }
]);
  }());
