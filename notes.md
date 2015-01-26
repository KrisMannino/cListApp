error: "illegal value [u'url']
for parameter retvals;
legal values are [
'id', 'account_id', 'source', 'category',
'category_group', 'location', 'external_id',
'external_url', 'heading', 'body', 'html',
'timestamp', 'expires', 'language', 'price',
'currency', 'images', 'annotations', 'status',
'immortal', 'deleted', 'state', 'flagged_status',
timestamp_deleted']"success: false__proto__: Object

&heading='+theWord+'
has_image1&

<li ng-show="!results.postings"><img src="http://rs127.pbsrc.com/albums/p123/hatsuharu555/dancingcat.gif~c200"/>
<p>No Results</p>
</li>

<div ng-view></div>

.controller('ShowController',["$scope", "$firebase","$http","$routeParams", function($http, $routeParams, $scope, $firebase){
  var id = $routeParams.id;
  $http.get('https://clistapp.firebaseio.com/' + id + '.json')
  .success(function(data){
    this.newData = data;
    })
    .error(function(err){
      console.log(err);
      });
      }])

      ng-click="go('/items')"

      <div ng-show="!results.postings" style="display:none">There is no sites avaiable for you.</div>

      <div ng-repeat="(name, item) in items">
      <a href="" ng-href="#/items/{{name}}">{{item.text}}</a>
      </div>

      var fbReverse=function(obj){
        return Object.keys(obj).sort().reverse();
        alert(Object.keys(a).sort(sorter));
      };
      var fbSnapshot = fbReverse(fbObject);

      ////////////SearchAgain function////////////

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
            /*$('#searchBar').keypress(function(event){
              if(event.keyCode == 13){
                $('#searchButton').click();
              }
              });*/



              //////get in itemcontroller////////
              $http.get('https://clistapp.firebaseio.com/' + id + '/postings.json')
              .success(function(data){
                resultItem = data;
                console.log("some DATA "+resultItem)
                })
                .error(function(err){
                  console.log(err);
                  });
