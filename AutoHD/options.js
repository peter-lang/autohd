var storage = chrome.storage.sync;

function save_options() {
	var select = document.getElementById("quality"),
		quality = select.children[select.selectedIndex].value,
		disable_autostart = document.getElementById("disable_autostart").checked,
		sensitivity = document.getElementById("volume_scroll").checked ? document.getElementById('y_sensitivity').value : 0,
		invert_y = document.getElementById('y_invert').checked;

	storage.set({
		"yt_preferred_quality": quality,
		"yt_pause_featured_video": !!disable_autostart,
		'yt_sensitivity': sensitivity,
		'yt_invert_y': !!invert_y
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
		'yt_pause_featured_video': true,
		'yt_sensitivity': 0,
		'yt_invert_y': false
	}, function (items) {
		var quality = items['yt_preferred_quality'],
			disable_autostart = items['yt_pause_featured_video'],
			sensitivity = items['yt_sensitivity'],
			invert_y = items['yt_invert_y'];

		document.getElementById("disable_autostart").checked = !!disable_autostart;

		var select = document.getElementById("quality");
		for (var i = 0; i < select.children.length; i++) {
			var child = select.children[i];
			if (child.value == quality) {
				child.selected = "true";
				break;
			}
		}

		document.getElementById("volume_scroll").checked = !!sensitivity;
		if (sensitivity) {
			document.getElementById('y_sensitivity').value = sensitivity;
			volume_change();
			sensitivity_change();

		}
		document.getElementById('y_invert').checked = !!invert_y;
	});
}
function volume_change() {
	var volume_scroll_on = document.getElementById('volume_scroll').checked;
	[].slice.call(document.getElementsByClassName("volume_scroll"))
		.forEach(function (el) {
			el.style.display = volume_scroll_on ? 'block' : 'none';
		});
	return true;
}

function sensitivity_change() {
	var value = document.getElementById('y_sensitivity').value;
	document.getElementById('y_sensitivty_label').innerHTML = value;
	return true;
}

document.addEventListener('DOMContentLoaded', restore_options, false);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('volume_scroll').addEventListener('change', volume_change);
document.getElementById('y_sensitivity').addEventListener('input', sensitivity_change);
