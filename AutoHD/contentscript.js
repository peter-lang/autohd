var storage = chrome.storage.sync;

var scriptUrl = chrome.extension.getURL('script.js');

storage.get({
		'yt_preferred_quality': 'best', 
		'yt_pause_featured_video': true
	}, function (items) {
	var yt_preferred_quality_val = '"' + items['yt_preferred_quality'] + '"',
		yt_pause_featured_video_val = items['yt_pause_featured_video'] ? 'true' : 'false';

	var options = document.createElement('script');
	options.textContent = 
		"var yt_preferred_quality=" + yt_preferred_quality_val + ", " + 
		"    yt_pause_featured_video=" + yt_pause_featured_video_val + ";";
	(document.head||document.documentElement).appendChild(options);

	var script = document.createElement('script');
	script.src = scriptUrl;
	(document.head||document.documentElement).appendChild(script);

	script.onload = function() {
	    script.parentNode.removeChild(script);
	    options.parentNode.removeChild(options);
	};
});