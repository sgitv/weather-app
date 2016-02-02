var myApp = angular.module('myApp',['ngRoute','ngResource']);

myApp.config(function($routeProvider){
    
    $routeProvider
    .when('/',{
        templateUrl:'pages/home.htm',
        controller:'homeController'
    })
    .when('/forecast',{
        templateUrl:'pages/forecast.htm',
        controller:'forecastController'
    })
    
});

//services

myApp.service('cityService', function(){
   this.city ="hyderabad";
});

myApp.controller('homeController',function($scope,cityService){
    
    $scope.city = cityService.city;
   
    $scope.$watch('city',function(){
       cityService.city = $scope.city; 
    });
    
});
myApp.controller('forecastController',function($scope, $resource ,cityService){
    
    $scope.city = cityService.city;
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=44db6a862fba0b067b1930da0d769e98",{callback: "JSON_CALLBACK"},{get:{method:"JSONP"}});
    
    $scope.weatherResult = $scope.weatherAPI.get({q:$scope.city,cnt:2})
    console.log($scope.weatherResult);
});