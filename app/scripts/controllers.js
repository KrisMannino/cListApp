var ng = angular
;(function(){
  'use strict';

  ng.module('CListApp')

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
    var sync = $firebase(fbDataRef);
    var fbArray = sync.$asArray();

    $scope.removeItem = function(id){
      sync.$remove(id);
      console.log("removing " + id)
      $location.path("/")
    };
      $scope.newData = fbArray;

  }])
  .controller ('MainController',[ "$scope", "$http", "$firebase", "$location",function($scope, $http, $firebase, $location){

    var fbDataRef = new Firebase('https://clistapp.firebaseio.com/');
    var saveData = {food: "taco"};
    var newData;
    $scope.searchWord= function(){
      newData = {saved:""};
      var typedWord = $scope.NewSearch.term;

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
      var url = 'http://search.3taps.com?auth_token=11a2ac1d6fd4d8a9dcbd221445790888&retvals=id,images,price,external_url,source,body,heading,location&heading='+theWord+'&rpp=20&has_image1&location.metro=USA-NAS'
      function getJSONP(url, cbName){
        var $script = document.createElement('script');
        document.body.appendChild($script);
      }
      $http.get(url)
      .success(function(data){
        $scope.newData = data;
        $scope.newData.keyword = $scope.NewSearch;
        $scope.newData.saved = saveData;
        $scope.NewSearch="";
        fbDataRef.push($scope.newData);
          console.log($scope.newData);
        })
        .error(function(err){
          console.log(err);
        });
        $location.path("/");

    }
  }
])
/*.controller("LoginController",[ "$scope","$location",function($scope, $location) {
  $scope.login = function(email, password){
    var ref = new Firebase("https://<your-firebase>.firebaseio.com");
    ref.authWithPassword({
      email    : "bobtony@firebase.com",
      password : "correcthorsebatterystaple"
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });

  };

}])*/
  }());
