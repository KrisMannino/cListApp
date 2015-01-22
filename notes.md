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
