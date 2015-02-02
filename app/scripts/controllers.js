var ng = angular
;(function(){
  'use strict';

  ng.module('CListApp')

  .controller('ItemController',[ "$http", "$routeParams", "$firebase", "$location", "$scope",function($http, $routeParams, $firebase, $location, $scope){
    var id = $routeParams.id;
    var theUrl = "https://clistapp.firebaseio.com/"+ id;
    var ref = new Firebase(theUrl);
    var sync = $firebase(ref);
    var fbSnapshot = {};
/*    var rmUrl = theUrl+"/postings/"+id;
*/    ref.once('value', function(dataSnapshot) {
      /*var itemId = $routeParams.id.postings.id;*/
      fbSnapshot = dataSnapshot;
      var fbPostShot = {};
      $scope.fbPostShot = fbSnapshot.val();
/*      console.log("the postings[id] = "+$scope.fbPostShot.postings[$routeParams.id].heading);
*/      console.log(id);
    })
    var removeItem = function(){
        sync.$remove(id);
        console.log("removing " + id);
/*        $location.path("/");
*/      };

  }])

  .controller('SinItemController',["$http", "$routeParams", "$firebase", "$location", "$scope",function($http, $routeParams, $firebase, $location, $scope){
    var id = $routeParams.id;
    console.log(id);
    console.log($location.$$url);
    var singleId = $location.$$url;
    var theUrl = "https://clistapp.firebaseio.com/"+ singleId;
    var ref = new Firebase(theUrl);
    var sync = $firebase(ref);
    var sinfbArray = sync.$asObject();
console.log(sinfbArray);
    var fbSnapshot = {};
/*    var rmUrl = theUrl+"/postings/"+id;
*/    ref.once('value', function(dataSnapshot) {
      /*var itemId = $routeParams.id.postings.id;*/
      fbSnapshot = dataSnapshot;
      var sinfbPostShot = {};
      $scope.sinfbPostShot = fbSnapshot.val();
/*      console.log("the postings[id] = "+$scope.fbPostShot.postings[$routeParams.id].heading);
*/      console.log(id);
    })
/*    console.log($scope.sinfbPostShot);
*/    var removeItem = function(){
        sync.$remove();
        console.log("removing " + sync);
/*        $location.path("/");
*/      };


  }])

    .controller("UserController",["$scope","$firebase","$location",function($scope,$firebase,$location){
      $scope.aUser = function(){
        console.log("this aUser fired, id = ")
      }

      $scope.createUser = function(){
        var ref = new Firebase("https://clistapp.firebaseio.com/");
          ref.createUser({
            email    : $scope.email,
            password : $scope.password
          }, function(error) {
            if (error === null) {
              console.log("User created successfully");
            } else {
              console.log("Error creating user:", error);
            }
          });

      }
    }])


  .controller("ResultsController",[ "$scope", "$firebase", "$http", "$location", "$routeParams", function($scope, $firebase, $http, $location, $routeParams) {
    var fbDataRef = new Firebase('https://clistapp.firebaseio.com/');
    var sync = $firebase(fbDataRef);
    var fbArray = sync.$asArray();

    $scope.removeItem = function(id){
      sync.$remove(id);
      console.log("removing " + id)
      $location.path("/")
    };
      $scope.newData = fbArray;

  }])
  .controller ('SearchController',[ "$scope", "$http", "$firebase", "$location",function($scope, $http, $firebase, $location){

        var myDataRef = new Firebase('https://clistapp.firebaseio.com/');
        var saveData = {food: "taco"};
        var newData;
        $scope.searchWord= function(){
          newData = {saved:""};
          var typedWord = $scope.NewSearch.term;

        var fbDataRef = new Firebase('https://clistapp.firebaseio.com/');
        var sync = $firebase(fbDataRef);
        var fbSnapshot = {};

        fbDataRef.once('value', function(dataSnapshot) {
          dataSnapshot.forEach(function(fb) {
            var fbPost = fb.val();
            var fbId = fb.key();
            if(typedWord == fbPost.keyword.term){
              saveData = fbPost.saved;
              sync.$remove(fbId);
              console.log("removed = "+ fbId);
            }
          })
        });

      var theWord = '"'+typedWord+'"';

      console.log(theWord);
      /*var url = 'http://polling.3taps.com/anchor?auth_token=11a2ac1d6fd4d8a9dcbd221445790888&timestamp=1422753521'*/

      var url = 'http://search.3taps.com?auth_token=11a2ac1d6fd4d8a9dcbd221445790888&anchor=1782832144&retvals=id,images,price,external_url,source,body,heading,timestamp,location&heading='+theWord+'&rpp=20&has_image1&location.metro=USA-NAS'
     /* function getJSONP(url, cbName){
        var $script = document.createElement('script');
        document.body.appendChild($script);
      }*/
      $http.get(url)
      .success(function(data){
        $scope.newData = data;
        console.log($scope.newData.postings[0].timestamp);
        for(var i =0; i<$scope.newData.postings.length;i++){console.log(postings[i]);}
        $scope.newData.keyword = $scope.NewSearch;
        $scope.newData.saved = saveData;
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
])

  }());
