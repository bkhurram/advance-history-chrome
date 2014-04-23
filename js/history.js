console.log( "start" );

BG = chrome.extension.getBackgroundPage();

var app = angular.module( "history", [ "ui.bootstrap" ] );
app.config( [ '$compileProvider', 
	function( $compileProvider ) {
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
	}
]);

app.directive( 'whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
         
        elm.bind( 'scroll', function() {
            if ( raw.scrollTop + raw.offsetHeight >= raw.scrollHeight ) {
                scope.$apply( attr.whenScrolled );
            }
        });
    };
});

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
        
        $scope.items = 50;
        $scope.page_number = 1;
        
        $scope.page_start   = $scope.items * ($scope.page_number-1);
        $scope.page_end     = $scope.items * $scope.page_number;
        
        // # on click search
	$scope.loadMore = function() {
		
                $scope.page_start   = $scope.items * ($scope.page_number-1);
                $scope.page_end     = $scope.items * $scope.page_number;
		
                console.log( $scope.page_start );
                console.log( $scope.page_end);
                
                var params ={ 
                                keyword: $scope.keyword,
                                startTime: $scope.dtFrom.getTime(), 
                                endTime: $scope.dtTo.getTime(),
                                pageStart: $scope.items * ($scope.page_number-1),
                                pageEnd: $scope.items * $scope.page_number,
                                items: $scope.items
                            };
                
		chrome.extension.sendRequest({ fn: "getHistory", params : params }, function( response ) {
			console.log( response );
                        
			$scope.$apply(function(){
                            for( var i = 0; i < response.length; i++){
                                $scope.lists.push( response[ i ] );
                            }
                        });
                        
                        // # go to next page
                        $scope.page_number++;
		});
		
	};
        
        $scope.search = function() {
            //$scope.lists = [];
            //$scope.loadMore();
            $scope.page_start   = $scope.items * ($scope.page_number-1);
            $scope.page_end     = $scope.items * $scope.page_number;
            
            console.log( $scope.page_start );
            console.log( $scope.page_end);
                
            var params ={ 
                keyword: $scope.keyword,
                startTime: $scope.dtFrom.getTime(), 
                endTime: $scope.dtTo.getTime(),
                pageStart: $scope.page_start,
                pageEnd: $scope.page_end,
                items: $scope.items
            };
                
            chrome.extension.sendRequest({ fn: "getHistory", params : params }, function( response ) {
               
                //console.log( response );
                    
                $scope.$apply(function(){
                    $scope.lists = response;

                });

                // # go to next page
                $scope.page_number++;
            });
        };
        
        $scope.search();
	
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
			
	};
	
	$scope.getHost = function( url ) {
		
		var host = url.match(/(http|https)+(:\/\/)+(\S[^/\s]+)/g );
		
		return isBlank( host ) ? url : host.toString();
	};
	
});



$( function() {
	
	
});

// # send request to Background script
chrome.extension.sendRequest({ fn: "log" });
