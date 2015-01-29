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
    var sync = $firebase(fbDataRef);
    var fbArray = sync.$asArray();

    /*$scope.cycleThru = function(){
      for (var i =0;i<fbArray.length;i++)
      {
        console.log("hlleo");
        }
    }; $scope.cycleThru();*/

      $scope.newData = fbArray;


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

          var word1 = fbSearch.val();
          var id1 = fbSearch.key();
          /*console.log(searchKey);*/
          console.log("id "+id1);
         fbSnapshot.forEach(function(fbSearchlvl2) {
            var id2 = fbSearchlvl2.key();
            var word2 = fbSearchlvl2.val();
            console.log("id2 = "+id2);
            console.log("id1 "+id1);
            if(id1!=id2){
                if(word1.keyword.term == word2.keyword.term){
                  var fbDataRef2 = new Firebase("https://clistapp.firebaseio.com/"+id2);
                  console.log("https://clistapp.firebaseio.com/"+id2);
                  console.log(word2)
                  var sync2 = $firebase(fbDataRef2);
                  sync2.$remove(id1);
                  sync2.$set(word2);
                  console.log("2ord =  "+word2.keyword.term);
                  console.log("1ord "+word1.keyword.term);
                  console.log("id2 = "+id2);
                  console.log("id1 "+id1);
                }
              }console.log("nope");

          })
        /*  var searchKey = key.keyword.term;
          var fbUpdateData;
          */

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
