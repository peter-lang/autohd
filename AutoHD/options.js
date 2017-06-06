(function (storage) {

function get_select_value(id) {
	var select = document.getElementById(id);
	return select.children[select.selectedIndex].value;
}

function set_select_value(id, value) {
	var select = document.getElementById(id);
	for (var i = 0; i < select.children.length; i++) {
		var child = select.children[i];
		if (child.value == value) {
			child.selected = "true";
			break;
		}
	}
}

function notify_label(input_id, label_id) {
	document.getElementById(label_id).innerHTML = document.getElementById(input_id).value;
	return true;
}

function check_visibility(class_name, predicate) {
	[].slice.call(document.getElementsByClassName(class_name))
		.forEach(function (el) {
			el.style.display = predicate ? 'block' : 'none';
		});
	return true;
}

function save_options() {
	var quality = get_select_value("quality"),
		disable_autostart = document.getElementById("disable_autostart").checked,

		seek_scroll = get_select_value('seek_scroll'),
		x_sensitivity = document.getElementById('x_sensitivity').value,
		x_invert = document.getElementById('x_invert').checked,
		x_step = document.getElementById('x_step').value,

		volume_scroll = get_select_value('volume_scroll'),
		y_sensitivity = document.getElementById('y_sensitivity').value,
		y_invert = document.getElementById('y_invert').checked,
		y_step = document.getElementById('y_step').value;

	storage.set({
		"yt_preferred_quality": quality,
		"yt_pause_featured_video": !!disable_autostart,
		'yt_volume_scroll': volume_scroll,
		'yt_seek_scroll': seek_scroll,
		'yt_step_x': x_step,
		'yt_step_y': y_step,
		'yt_sensitivity_x': x_sensitivity,
		'yt_sensitivity_y': y_sensitivity,
		'yt_invert_x': !!x_invert,
		'yt_invert_y': !!y_invert
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
		'yt_volume_scroll': 'FULL_SCREEN',
		'yt_seek_scroll': 'FULL_SCREEN',
		'yt_step_x': 5,
		'yt_step_y': 5,
		'yt_sensitivity_x': 10,
		'yt_sensitivity_y': 10,
		'yt_invert_x': false,
		'yt_invert_y': false
	}, function (items) {
		var quality = items['yt_preferred_quality'],
			disable_autostart = items['yt_pause_featured_video'],

			seek_scroll = items['yt_seek_scroll'],
			x_sensitivity = items['yt_sensitivity_x'],
			x_invert = items['yt_invert_x'],
			x_step = items['yt_step_x'],

			volume_scroll = items['yt_volume_scroll'],
			y_sensitivity = items['yt_sensitivity_y'],
			y_invert = items['yt_invert_y'],
			y_step = items['yt_step_y'];

		set_select_value('quality', quality);
		document.getElementById("disable_autostart").checked = !!disable_autostart;

		// Volume Scroll
		set_select_value('volume_scroll', volume_scroll);
		check_visibility('volume_scroll', volume_scroll !== 'NONE');

		document.getElementById('y_sensitivity').value = y_sensitivity;
		notify_label('y_sensitivity', 'y_sensitivty_label');

		document.getElementById('y_invert').checked = !!y_invert;

		document.getElementById('y_step').value = y_step;
		notify_label('y_step', 'y_step_label');

		// Seek Scroll
		set_select_value('seek_scroll', seek_scroll);
		check_visibility('seek_scroll', seek_scroll !== 'NONE');

		document.getElementById('x_sensitivity').value = x_sensitivity;
		notify_label('x_sensitivity', 'x_sensitivty_label');

		document.getElementById('x_invert').checked = !!x_invert;

		document.getElementById('x_step').value = x_step;
		notify_label('x_step', 'x_step_label');
	});
}

document.addEventListener('DOMContentLoaded', restore_options, false);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('volume_scroll').addEventListener('change', function(){
	return check_visibility('volume_scroll', get_select_value('volume_scroll') !== 'NONE');
});
document.getElementById('seek_scroll').addEventListener('change', function(){
	return check_visibility('seek_scroll', get_select_value('seek_scroll') !== 'NONE');
});
document.getElementById('y_sensitivity').addEventListener('input', function(){
	return notify_label('y_sensitivity', 'y_sensitivty_label');
});
document.getElementById('y_step').addEventListener('input', function(){
	return notify_label('y_step', 'y_step_label');
});
document.getElementById('x_sensitivity').addEventListener('input', function(){
	return notify_label('x_sensitivity', 'x_sensitivty_label');
});
document.getElementById('x_step').addEventListener('input', function(){
	return notify_label('x_step', 'x_step_label');
});

})(chrome.storage.sync);
