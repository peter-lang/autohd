var storage = chrome.storage.sync;

var scriptUrl = chrome.extension.getURL('script.js');

storage.get("yt_preferred_quality", function (items) {
	var yt_preferred_quality = items.yt_preferred_quality || "best";

	var options = document.createElement('script');
	options.textContent = "var yt_preferred_quality='"+yt_preferred_quality+"';";
	(document.head||document.documentElement).appendChild(options);

	var script = document.createElement('script');
	script.src = scriptUrl;
	(document.head||document.documentElement).appendChild(script);

	script.onload = function() {
	    script.parentNode.removeChild(script);
	    options.parentNode.removeChild(options);
	};
});