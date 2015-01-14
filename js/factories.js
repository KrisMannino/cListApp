(function() {

  'use strict';
  angular.module('CListApp', [])

  .factory ('craigslistFactory', function(){
    var factory = {};
    var anyWord = "hope";

    factory.anyword= function(){
      console.alert(anyWord);
      return anyWord;

    }

    return factory;

})

}());
