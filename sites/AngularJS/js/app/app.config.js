'use strict';

angular.module('try').
  config(function($routeProvider){
    $routeProvide
     .when("/", {
        templateUrl : "index.html"
    })
    .when("/article", {
        templateUrl : "templates/redappartament-info.html"
    })
  });