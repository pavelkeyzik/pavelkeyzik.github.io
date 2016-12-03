'use strict';

angular.module('appartamentsList').
  component('appartamentsList', {
    //template: "<div class=''><h1>{{ title }}</h1><button ng-click='someClickTest()'>Click Me!</button></div>",
    templateUrl: "./templates/appartaments-list.html",
    controller: function($scope, $http) {
      $http.get("./api.json").then(successCallback, errorCallback);

      function successCallback(response) {
        console.log(response);
        $scope.items = response.data.response.listings;
        $scope.pageInfo = response.data.response;
        $scope.request = response.data.request;
      }

      function errorCallback() {
        console.log("I didn't find data.");
      }
    }
});

  // controller('AppartamentsListCtrl', function($scope){
  //   console.log("Hello")
  //   $scope.title = "Hi there"
  //   $scope.clicks = 0
  //   $scope.someClickTest = function() {
  //     console.log("clicked")
  //     $scope.clicks++
  //     $scope.title = "Clecked " + $scope.clicks
  //   }
  // });
//  component('appartamentsList');
