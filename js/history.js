console.log( "start" );

BG = chrome.extension.getBackgroundPage();

var app = angular.module( "history", [ "ui.bootstrap" ] );
app.controller( "Search", function( $scope ) {
	
	'use strict';
	
	// # init js
	var today = new Date();
	
	// # init angular
	$scope.keyword = "";
	$scope.lists = [];
	
	$scope.today = today;
	$scope.dtFrom = new Date( today.getFullYear(), today.getMonth()-1, today.getDate() );
	$scope.dtTo = new Date();
	
	chrome.extension.sendRequest({ fn: "getHistory", params : { keyword: $scope.keyword } }, function( response ) {
		
		$scope.$apply(function(){
			$scope.lists = response;
		});
		
	});
	
	// # on click search
	$scope.searchkeyword = function() {
		console.log( $scope.dtFrom );
		console.log( $scope.dtTo );
		
		chrome.extension.sendRequest({ fn: "getHistory", params : { keyword: $scope.keyword, startTime: $scope.dtFrom.getTime(), endTime: $scope.dtTo.getTime() } }, function( response ) {
			console.log( response );
			$scope.$apply(function(){
				$scope.lists = response;
			});
		
		});
		
	}
	
	// # on click X remove
	$scope.remove = function( url, index ) {
		
		console.log( "clic remove" );
		chrome.extension.sendRequest({ fn: "remove", params :{ url: url } }, function( response ) {
			console.log( "remove" );
			console.log( response.status );
			if( response.status ) {
				
				$scope.$apply(function() {
					$scope.lists.splice( index, 1 );
				});
			
			}
		});
			
	}
	
	
	
});



$( function() {
	
	
});

// # send request to Background script
chrome.extension.sendRequest({ fn: "log" });
