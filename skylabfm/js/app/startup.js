/* github.com/andrewbaldock/skylabfm */

// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, this app's custom code.

// declare the aB object
aB={fn:{}};
aB.baseurl = "https://dsp-skylabfm.cloud.dreamfactory.com/rest";
aB.apikey = '?app_name=skylabfm';
aB.usertype = 'temp';

//cookie read
aB.readCookie = function (name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {c = c.substring(1, c.length);}
		if (c.indexOf(nameEQ) === 0) {return c.substring(nameEQ.length, c.length);}
	}
	return null;
};
// cookie write
aB.writeCookie = function (name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	document.cookie = name + "=" + value + expires + "; path=/; domain=skylabfm.com";
};

//set temp userid
(function tempId(){
	var c = aB.readCookie('skylabfm');
	if (c != null) {
		aB.userid = c;
	} else {
		var d = new Date;
		var t = d.getTime();
		aB.userid = 'temp' + t;
		aB.writeCookie('skylabfm',aB.userid,365);
	}
}());

requirejs.config({
    "baseUrl": "js/lib",
    shim: {   // Using shim we define dependencies between our libraries
    	'underscore': {
			exports: '_'
    	},
    	'backbone': {
      		deps: ['underscore','jquery'],
      		exports: 'Backbone'
    	},
    	'sticky': {
      		deps: ['jquery'],
      		exports: 'Sticky'
    	}
  	},
    "paths": {
      "app" :         "../app",
      "jquery" : 	  "//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min",
      "json2" :       "//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min",
      "underscore" :  "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min",
      "backbone" : 	  "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min",
      "soundcloud" :  "//connect.soundcloud.com/sdk",
      "player" : 	  "https://w.soundcloud.com/player/api",
      "sticky" :      "sticky.min",
      "spin" :        "spin.min"
    }
});
___={_:'s0und'};
// Load the main app module to start the app
requirejs(["app/main"]);
