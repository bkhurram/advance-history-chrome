/**
 * Radio24 common js stuff
 * 
 * @copyright NTTData Italia 2013 - 2014
 * @author Riccardo Brambilla aka RiBrain <Riccardo.Brambilla@nttdata.comm> <riccardobra@gmail.com>
 */

// # REGEXPS definition
SPACES_REGEXP = /^\s+$/;
INNER_SPACES_REGEXP = /\s/;
NUMERIC_REGEXP = /^[0-9]+$/;
EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
SYMBOLS_REGEXP = /[\.|\:|\;]+/;

/**
 * StartsWith utility
 * 
 * @param str
 * @returns {Boolean}
 */
String.prototype.startsWith = function( str ) {
	return ( this.match( "^"+str ) == str );
};


/**
 * Array IndexOf prototype def
 * IE <= 8 doesn't have the array indexOf method....
 */
if ( !Array.prototype.indexOf ) {
	
	Array.prototype.indexOf = function( elt ) {
		
		var len = this.length >>> 0;

		var from = Number( arguments[ 1 ] ) || 0;
		from = (from < 0) ? Math.ceil( from ) : Math.floor( from );
		if ( from < 0 )
			from += len;

		for (; from < len; from++) {
			if ( from in this && this[ from ] === elt )
				return from;
		}
		return -1;
	};
}

/**
 * Returns the string wrapped to length Stops after a space in order not to
 * break words
 * 
 * @param stringToWrap
 * @param length
 * @returns
 */
function getTrimmedString( stringToWrap, length ) {
	
	if( typeof stringToWrap === "string" ) {
		
		if( stringToWrap.length <= length ) {
			return stringToWrap;
		}
		
		var lastSpacePos = stringToWrap.lastIndexOf( " ", length );
		return stringToWrap.substring( 0, lastSpacePos ) + "...";	
		
	}
	
	return "";
}

/**
 * INNER TRIM function
 * 
 * @param el2TrimID
 *            id of the element to be trimmed
 * @returns {String}
 */
function noBlanks( stringToCompact ) {
	return stringToCompact.replace( /\s/g, '' );
}

/**
 * Converts any multiple space into one
 * 
 * @param stringToBeProcessed
 * @returns {String}
 */
function oneSpaceOnly( stringToBeProcessed ) {
	
   var temp = stringToBeProcessed;
   var obj = /^(\s*)([\W\w]*)(\b\s*$)/;
   
   if ( obj.test(temp) ) { temp = temp.replace( obj, '$2' ); }
   var obj = / +/g;
   temp = temp.replace( obj, " " );
   if (temp == " ") { temp = ""; }
   
   return temp;
}

/**
 * Checks if variable is set
 * 
 * @param object
 * @returns {Boolean}
 */
function isSet( object ) {
	
	if( null != object && undefined != object && "undefined" != object ) {
		return true;
	}
	
	return false;
}

/**
 * Blank checker
 * 
 * @param variable
 *            the variable value to be checked
 * @returns {Boolean}
 */
function isBlank( variable ) {	
	return ( null == variable || "" == $.trim(variable) || SPACES_REGEXP.test(variable) || undefined == variable || "undefined" == variable || "0" === variable || 0 === variable ) ? true : false;
}

/**
 * Check if variable contains space(s)
 * 
 * @param variable
 * @returns {Boolean}
 */
function hasBlanks( variable ) {
	return INNER_SPACES_REGEXP.test( variable );
}

/**
 * Return an empty string if variable passed is blank
 * 
 * @param variable
 * @returns mixed
 */
function emptyIfBlank( variable ) {
	return !isBlank( variable ) ? variable : "";
}

/**
 * Check if variable is Alphanumeric
 * 
 * @param variable
 * @returns
 */
function hasSimbols( variable ) {
	return SYMBOLS_REGEXP.test( variable );
}

/**
 * Check if param sent only consists in a number only sequence
 * 
 * @param numToBeChecked
 * @returns {Boolean}
 */
function isNumeric( numToBeChecked ) {
	return NUMERIC_REGEXP.test( numToBeChecked );
}

/**
 * Check email syntax validity
 * 
 * @param emailToBeChecked
 * @returns {Boolean}
 */
function isValidEmail( emailToBeChecked ) {
	return EMAIL_REGEXP.test( emailToBeChecked );
}

/**
 * GET vars grabber
 * 
 * @return vars
 */
function getUrlVars() {
	
	// # Init
    var vars = [], hash, existParam = "";
    existParam = window.location.href.indexOf( "?" );
    
    // # No params exit
    if( existParam < 0 ) {
    	return vars;
    }
    
    var hashes = window.location.href.slice( window.location.href.indexOf( "?" ) + 1 ).split( "&" );
    var hashesLength = hashes.length;
    for( var i = 0; i < hashesLength; i++) {
    	hash = hashes[ i ].replace( "#", "" ).split( "=" );
        vars.push(hash[0]);
        vars[ hash[ 0 ] ] = hash[1];
    }
    
    return vars;
}

/**
 * Decode urlended string
 * 
 * @param str
 * @returns
 */
function urldecode( str ) {
	return decodeURIComponent( ( str + '' ).replace( /\+/g, '%20' ) );
}


/**
 * Loops through the object till it finds the corresponding value
 * 
 * @param object
 * @param matchingKey
 * @param needle
 * @param targetKey
 * @returns string or null if no matches found 
 */
function getKeyValueByNeedle( object, matchingKey, needle, targetKey ) {
	
	var objLength = object.length;
	for( var i = 0; i < objLength; i++ ) {
		if( object[ i ][ matchingKey ] == needle ) {
			return object[ i ][ targetKey ];
		}
	}
	
	return null;
}

/**
 * Adding size properties to the Object object
 * Note: not prototyping here cause JS conventions 
 * discourages prototyping on Object
 * 
 * @param obj
 * @returns {Number}
 */
Object.size = function(obj) {

    if( typeof obj === "object" ) {
    	
        var size = 0, key = "";
        for ( key in obj ) {
            if ( obj.hasOwnProperty( key ) ) size++;
        }
        return size;
    }
};

/**
 * make first letter to uppercase
 * @param str
 * @returns string 
 */
function ucfirst( str ) {
    str = str.replace( /^\s+|\s+$/g, "" ).toLowerCase();
    return str[ 0 ].toUpperCase() + str.slice( 1 );
}

/**
 * Detect touch device 
 * @returns Boolean
 */
function is_touch_device() {
	  return !!( 'ontouchstart' in window ) // works on most browsers 
	      || !!( 'onmsgesturechange' in window ); // works on ie10
}

// # A global month names array
var gsMonthNames = new Array (
	'Gennaio',
	'Febbraio',
	'Marzo',
	'Aprile',
	'Maggio',
	'Giugno',
	'Luglio',
	'Agosto',
	'Settembre',
	'Ottobre',
	'Novembre',
	'Dicembre'
);

// # A global day names array
var gsDayNames = new Array (
	'Domenica',
	'Lunedì',
	'Martedì',
	'Mercoledì',
	'Giovedì',
	'Venerdì',
	'Sabato'
);

// # Date format prototype
Date.prototype.format = function( format ) {
	
	if ( !this.valueOf() ){
		return '&nbsp;';
	}
	
	if( isBlank( format ) ) {
		return '&nbsp;';
	}

	var d = this;
	return format.replace(/(Y|y|F|M|m|n|l|D|j|d)/gi,
			
			function( strFormat ) { 
		
				switch ( strFormat ) {
					case 'Y': return d.getFullYear();
					case 'y': return String(d.getFullYear()).substr(2, 4);
					case 'F': return gsMonthNames[d.getMonth()];
					case 'M': return gsMonthNames[d.getMonth()].substr(0, 3);
					case 'm': return ((d.getMonth() + 1)>0 && (d.getMonth() + 1)<10)?'0'+(d.getMonth() + 1):(d.getMonth() + 1);
					case 'n': return (d.getMonth() + 1);
					case 'l': return gsDayNames[d.getDay()];
					case 'D': return gsDayNames[d.getDay()].substr(0, 3);
					case 'j': return d.getDate();
					case 'd': return (d.getDate()>0 && d.getDate()<10)?'0'+d.getDate():d.getDate();
				}
			}
	);
};

/**
 * Get cookie by name
 * 
 * @param c_name
 * @returns
 */
function getCookie( c_name ) {
	
	var i, x, y = "";
	var cookieArray = document.cookie.split( ";" );
	
	for( i = 0; i < cookieArray.length; i++ ) {
		
		x = cookieArray[ i ].substr( 0, cookieArray[ i ].indexOf( "=" ) );
		y = cookieArray[ i ].substr( cookieArray[ i ].indexOf( "=" ) + 1);
		x = x.replace(/^\s+|\s+$/g, "" );
		if( x == c_name ) {
			return unescape( y );
		}
	}
	
	return false;
}

/**
 * Sets a cookie
 * 
 * @param name
 * @param val
 * @param min
 * @param path
 * @param dom
 * @param sec
 */
function setCookie( name, val, min, path, dom, sec ) {
	
	var expires = "";
	
	if( min ) {
		var date = new Date();
		date.setTime( date.getTime() + ( min * 60000 ) );
		expires = "; expires=" + date.toGMTString();
	}
	
	document.cookie = 	name + "=" + escape( val ) + 
						expires + 
						( ( path ) ? "; path=" + path : "" ) + 
						( ( dom) ? ";domain=" + dom : "" ) +
						( ( sec ) ? "; secure" : "" );
}

/**
 * Deletes a cookie
 * 
 * @param name
 * @param path
 * @param domain
 */
function deleteCookie( name, path, domain ) {
	
	if( getCookie( name ) ) {
		document.cookie = name+"=;"+((path)?";path="+path:"")+((domain)?";domain="+domain:"")+";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}
}

/**
 * Omniture String replace
 * @param str
 * @returns
 */
function replaceOmnitureStr( str ) {
	
	// # REGEX to replace html special chars(&***;) with "-"
	str = str.replace( /&\w{2,6};/gmi,"");
	
	// # delete special char
	str = str.replace( /[^a-zA-Z0-9 ]/gmi, "" );
	
	// # replace space with -
	str = str.replace( /\s/gmi, "-" );
	
	return str;
}

/**
 * Detects device orientation
 * 
 * @param degrees orientation degree
 */
function computeDeviceOrientation( degrees ) {
	
	if( degrees == 0 || degrees == 180 ) {
		return "portrait";
	}
	
	return "landscape";
}
