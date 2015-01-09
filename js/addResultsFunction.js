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
