'use strict';

/**
 * @ngdoc function
 * @name indegoUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the indegoUiAppk
 */
var ctrs = angular.module('BikeControllers',[]);

  ctrs.controller('BikeUsageController', ['$scope', 'bikeService', function ($scope, bikeService) {
        bikeService.query(function(data){
            $scope.dataSet = data.features;
        });
  }]);

  ctrs.controller('BikeDetailController', ['$scope','$routeParams','bikeService',
                                           function($scope, $routeParams, bikeService) {
      bikeService.query(function(data) {
         //Iterate throgh the data and pass
         var myLatLng = new google.maps.LatLng(39.9522, -75.1639);
         var mapOptions = {
                 center: myLatLng,
                 zoom: 12
             };

         var map = new google.maps.Map(document.getElementById('map'), mapOptions);

          angular.forEach( data.features, function (value){

              if (value.properties.kioskId == $routeParams.kioskId) {
                $scope.kioskData = value;
                var myLatLng = new google.maps.LatLng(value.geometry.coordinates[1], value.geometry.coordinates[0]);
                var mapOptions = {
                        center: myLatLng,
                        zoom: 12
                    };
                var map = new google.maps.Map(document.getElementById('map'), mapOptions);
                var contentForInfoWindow = '<div>Available Bikes:' + value.properties.bikesAvailable + '</div>' +
                '<div>Station Name: ' + value.properties.
                var infowindow = new google.maps.InfoWindow({
                    content: contentForInfoWindow
                });

                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: value.properties.addressStreet
                });
                marker.addListener('click', function() {
                    infowindow.open(map,marker);
                });
              }
           });
      });
  }]);

  ctrs.controller('BikeMainController', ['$scope','$routeParams','bikeService',
                                           function($scope, $routeParams, bikeService) {
      bikeService.query(function(data) {
         //Iterate throgh the data and pass
         //Iterate throgh the data and pass
         var myLatLng = new google.maps.LatLng(39.9522, -75.1639);
         var mapOptions = {
                 center: myLatLng,
                 zoom: 12
             };

         var map = new google.maps.Map(document.getElementById('map'), mapOptions);

          angular.forEach( data.features, function (value){
            var contentForInfoWindow = '<div>Available Bikes:' + value.properties.bikesAvailable + '</div>'
            var infowindow = new google.maps.InfoWindow({
                content: contentForInfoWindow
            });
                    var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(value.geometry.coordinates[1], value.geometry.coordinates[0]),
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: value.properties.addressStreet
                });
                marker.addListener('click', function() {
                    infowindow.open(map,marker);
                });

           });

      });
  }]);
