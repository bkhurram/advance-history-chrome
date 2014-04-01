console.log( "global scope" );

	// # function call by popup
chrome.extension.onRequest.addListener( function( request, sender, sendResponse ) {
	
	// # 
	console.log( request );
	console.log( sender );
	console.log( sendResponse );
	
	switch( request.fn ) {
		
		case "log": console.log( "log" );
		break;
		
		case "getHistory": 
			console.log( "get history" );
			var objSearch = {
				text: request.params.keyword,
				startTime: request.params.startTime,
				endTime: request.params.endTime,
				maxResults: 50
			}
			console.log( objSearch );
			chrome.history.search( objSearch, function( results) {
				 
				console.log( results );
				// send data to popup
				sendResponse( results );
				
			});
		break;
		
		case "remove":
			console.log( "remove out" );
			var obj = { url: request.url };
			
			chrome.history.deleteUrl( obj, function( results) {
				console.log( "remove" );
				console.log( results );
				//sendResponse( results );
			});
			
		break;
	}      
});

var init = function(){
	var bgPage = chrome.extension.getBackgroundPage()
	bgPage.console.log( "dom ready" );
};

console.log( "global scope 2 " );

document.addEventListener( 'DOMContentLoaded', init );

// Look through all the pages in this extension to find one we can use.
var views = chrome.extension.getViews({ type: "tab" });
