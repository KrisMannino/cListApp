var ng = angular;
(function() {
  "use strict";
  ng.module('CListApp',['ngRoute'])

  .factory('helloFactory', function() {
    return function(name) {
      this.name = name;
      this.hello = function() {
        return "Hello " + this.name;
      };
    };
  });

}());
