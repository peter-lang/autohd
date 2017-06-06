var storage = chrome.storage.sync;

var scriptUrl = chrome.extension.getURL('script.js');

storage.get({
		'yt_preferred_quality': 'best', 
		'yt_pause_featured_video': true,
		'yt_volume_scroll': 'FULL_SCREEN',
		'yt_seek_scroll': 'FULL_SCREEN',
		'yt_step_x': 5,
		'yt_step_y': 5,
		'yt_sensitivity_x': 10,
		'yt_sensitivity_y': 10,
		'yt_invert_x': false,
		'yt_invert_y': false
	}, function (items) {
	var sheet = window.document.styleSheets[0];
	sheet.insertRule('div#yt_notifier { position:fixed; right:20px; top:20px; z-index:9999; font-family:"Helvetica Neue",Helvetica,Arial,sans-serif; font-size:18px; color:#FFFFFF; text-shadow:2px 2px 8px #000000; opacity: 1; transition: opacity 0s, height 0s; }', sheet.cssRules.length);
	sheet.insertRule('.ytp-fullscreen div#yt_notifier { top:70px; font-size:36px; }', sheet.cssRules.length);
	sheet.insertRule('div#yt_notifier.hide { opacity: 0; height: 0; transition: opacity 1s ease-in, height 0s linear 1s; }', sheet.cssRules.length);

	var options = document.createElement('script');
	options.textContent = "var yt_config=" + JSON.stringify(items) + ";";
	(document.head||document.documentElement).appendChild(options);

	var script = document.createElement('script');
	script.src = scriptUrl;
	(document.head||document.documentElement).appendChild(script);	

	script.onload = function() {
	    script.parentNode.removeChild(script);
	    options.parentNode.removeChild(options);
	};

});
