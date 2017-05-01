var storage = chrome.storage.sync;

function save_options() {
	var select = document.getElementById("quality"),
		quality = select.children[select.selectedIndex].value;
		disable_autostart = document.getElementById("disable_autostart").checked;

	storage.set({
		"yt_preferred_quality": quality,
		"yt_pause_featured_video": !!disable_autostart
	}, function () {
		var status = document.getElementById("status");
		status.innerHTML = "Options Saved.";
		setTimeout(function() {
			status.innerHTML = "";
		}, 2000);
	});
}

function restore_options() {
	storage.get({
		'yt_preferred_quality': 'best', 
		'yt_pause_featured_video': true
	}, function (items) {
		var quality = items['yt_preferred_quality'],
			disable_autostart = items['yt_pause_featured_video'];

		document.getElementById("disable_autostart").checked = !!disable_autostart;

		var select = document.getElementById("quality");
		for (var i = 0; i < select.children.length; i++) {
			var child = select.children[i];
			if (child.value == quality) {
				child.selected = "true";
				break;
			}
		}
	});
}
document.addEventListener('DOMContentLoaded', restore_options, false);
document.querySelector('#save').addEventListener('click', save_options);