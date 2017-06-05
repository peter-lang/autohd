var storage = chrome.storage.sync;

var scriptUrl = chrome.extension.getURL('script.js');

storage.get({
		'yt_preferred_quality': 'best', 
		'yt_pause_featured_video': true,
		'yt_sensitivity': 0,
		'yt_invert_y': false
	}, function (items) {
	var yt_preferred_quality_val = '"' + items['yt_preferred_quality'] + '"',
		yt_pause_featured_video_val = items['yt_pause_featured_video'] ? 'true' : 'false',
		yt_sensitivity = items['yt_sensitivity'],
		yt_invert_y = items['yt_invert_y'] ? 'true' : 'false';

	var sheet = window.document.styleSheets[0];
	sheet.insertRule('div#volume_meter { opacity: 1; transition: opacity 0s, height 0s; }', sheet.cssRules.length);
	sheet.insertRule('div#volume_meter.hide { opacity: 0; height: 0; transition: opacity 1s ease-in, height 0s linear 1s; }', sheet.cssRules.length);

	var options = document.createElement('script');
	options.textContent = 
		"var yt_preferred_quality=" + yt_preferred_quality_val + ", " + 
		"    yt_pause_featured_video=" + yt_pause_featured_video_val + ", " + 
		"    yt_sensitivity=" + yt_sensitivity + ", " +
		"    yt_invert_y=" + yt_invert_y + ";";
	(document.head||document.documentElement).appendChild(options);

	var script = document.createElement('script');
	script.src = scriptUrl;
	(document.head||document.documentElement).appendChild(script);	

	script.onload = function() {
	    script.parentNode.removeChild(script);
	    options.parentNode.removeChild(options);
	};



});