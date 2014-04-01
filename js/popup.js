console.log( "start" );

BG = chrome.extension.getBackgroundPage();

var app = angular.module( "history", [] );
app.controller( "Search", function( $scope ) {
	
	'use strict';
	
	// # init
	$scope.keyword = "";
	$scope.lists = [];
	
	chrome.extension.sendRequest({ fn: "getHistory", params : { keyword: $scope.keyword } }, function( response ) {
		$scope.lists = response;
	});
	
	
	$scope.searchkeyword = function() {
		
		chrome.extension.sendRequest({ fn: "getHistory", params : { keyword: $scope.keyword } }, function( response ) {
			$scope.lists = response;
		});
		
	}
});
/*
		// # console log
		chrome.tabs.executeScript( null, { code: "log( 'Modifica' );" } );
		
		// # execute code on content_scripts of page
		chrome.tabs.executeScript( null, { code: "templates = " + JSON.stringify( self.templates ) + "; changePage( " + JSON.stringify( form ) + " );" } );
		

		chrome.storage.local.set({ 'name' : form.name });
		chrome.storage.local.set({ 'smallImages': form.smallImages });
		chrome.storage.local.set({ 'bigImages': form.bigImages });

	    chrome.storage.local.get( 'name', function (result) {
	    	name = result.name;
	        $( "#name" ).val( name );
	    });


	    chrome.storage.local.get( 'smallImages', function (result) {
	    	smallImages = result.smallImages;
	        $( "#smallpicture" ).val( smallImages );
	    });

	    chrome.storage.local.get( 'bigImages', function (result) {
	    	bigImages = result.bigImages;
	        $( "#bigpicture" ).val( bigImages );
	    });
*/

chrome.tabs.create({'url': "history.html"});
	
$( function() {
		// # open advance history
	//document.location.href = "history.html";
	//window.open( "history.html" )
	
	
	
});

// # send request to Background script
chrome.extension.sendRequest({ fn: "log" });


