'use strict';

angular.module('appartamentInfo').
  component('appartamentInfo', {
    //template: "<div class=''><h1>{{ title }}</h1><button ng-click='someClickTest()'>Click Me!</button></div>",
    templateUrl: "./templates/appartament-info.html",
    controller: function($scope, $http) {
      $http.get("./api.json").then(successCallback, errorCallback);

      function successCallback(response) {
        console.log(response);
        $scope.items = response.data.response.listings;
        $scope.pageInfo = response.data.response;
        $scope.request = response.data.request;
      }

      function errorCallback() {
        console.log("404 Not Found.");
      }
    }
});