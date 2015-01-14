  $scope.addResults = function(){
        $http.post('https://clistapp.firebaseio.com/.json', $scope.newData)
        .success(function(data){
          $scope.searchrecord[data.results]="hello";
        })
        .error(function(err){
          alert(err);
        });
      };$scope.addResults();
      console.log('addResults fired');


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

      $scope.searchrecord = [{ term: "what",
      postings: {}
    }];


    $scope.searchTerm = function(){
      $scope.searchrecord.unshift({
        term: $scope.NewSearch.term,
      });
      console.log("searchTerm fired");

      var myDataRef = new Firebase('https://clistapp.firebaseio.com/');
      myDataRef.push($scope.newData);


      .controller ('ResultsController', function($scope, $http){

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
      })

      $scope.dataKeys = sync.$asArray();
      console.log($scope.dataKeys);
      for(var i=0;i<10;i++){
        console.log($scope.dataKeys.$getRecord());
      }
      
