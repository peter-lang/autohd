(function(window) {
var yt_config = window.yt_config;
function override_scroll_event(player) {
	var d_vol = 0,
		d_seek = 0,
		movie_player = document.getElementById('movie_player'),
		notifier = document.getElementById('yt_notifier'),
		notifier_timeout = 0;

	if (!notifier) {
		notifier = document.createElement('div')
		notifier.id = 'yt_notifier';
		notifier.style.cssText = '';
		notifier.classList.add('hide');
		notifier.innerHTML = '&nbsp;';

		movie_player.appendChild(notifier);
	}

	function is_fullscreen() {
		return !!document.getElementById('movie_player').classList.contains('ytp-fullscreen');
	}

	function notify_player(text) {
		function html_escape(str) {
			return str
				.replace(/&/g, '&amp;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#39;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;');
		}
		notifier.innerHTML = html_escape(text);

		if (notifier_timeout) {
			clearTimeout(notifier_timeout);
			notifier_timeout = 0;
		}
		notifier.classList.remove('hide');
		notifier_timeout = setTimeout(function() {
			notifier.classList.add('hide');
			notifier_timeout = 0;
		}, 500);
	}

	function format_play_time(time) {
		function pad(val) {
			val = val + '';
			return val.length == 2 ? val : ('0'+val);
		}
		var hour = parseInt(time / 3600),
			minute = parseInt((time - hour*3600)/60),
			seconds = parseInt(time - hour*3600 - minute*60);
		return pad(hour) + ":" + pad(minute) + ":" + pad(seconds);
	}

	function scroll_enabled(scroll_value) {
		switch(scroll_value) {
			case "FULL_SCREEN":
				return is_fullscreen();
			case "ALL":
				return true;
			default:
				return false;
		}
	}

	movie_player.onwheel = function(e) {
		if (scroll_enabled(yt_config.yt_volume_scroll) && 
			(Math.abs(e.deltaY) >= 3*Math.abs(e.deltaX))) {
			// vertical scrolling - volume | direction is within +/- 16.7 degree
			d_vol += e.deltaY;
			var modulus = parseInt(d_vol / yt_config.yt_sensitivity_y);
			if (modulus) {
				d_vol -= modulus * yt_config.yt_sensitivity_y;
				var volume = Math.min(Math.max(player.getVolume() + (yt_config.yt_invert_y ? -modulus : modulus) * yt_config.yt_step_y, 0), 100);
				if (Math.abs(volume - player.getVolume()) < 1.0) {
					return true;
				}
				player.setVolume(volume);
				notify_player("Volume: " + player.getVolume() + '%');
				return false;
			} else {
				return false;
			}
		} else if (scroll_enabled(yt_config.yt_seek_scroll) && 
			(Math.abs(e.deltaX) >= 3*Math.abs(e.deltaY))) {
			// horizontal scrolling - seek | direction is within +/- 16.7 degree
			d_seek += e.deltaX;
			var modulus = parseInt(d_seek / yt_config.yt_sensitivity_x);
			if (modulus) {
				d_seek -= modulus * yt_config.yt_sensitivity_x;
				var seek = Math.min(Math.max(player.getCurrentTime() + (yt_config.yt_invert_x ? -modulus : modulus) * yt_config.yt_step_x, 0.0), player.getDuration());
				if (Math.abs(seek - player.getCurrentTime()) < yt_config.yt_step_x) {
					return true;
				}
				player.seekTo(seek);
				notify_player("Seek: " + format_play_time(player.getCurrentTime()) + " / " + format_play_time(player.getDuration()));
				return false;
			} else {
				return false;
			}
		}
		return true;
	};
}


window.onYouTubePlayerReady = function (player) {
	if (!player)
		return;

	var selected = (function(player) {
		if (yt_config.yt_preferred_quality === 'best') {
			return player.getAvailableQualityLevels()[0];
		} else {
			return yt_config.yt_preferred_quality;
		}
	})(player);

	function is_featured_video() {
		return new RegExp("^\/(user|channel)\/").test(window.location.pathname);
	};

	if (yt_config.yt_pause_featured_video && is_featured_video()) {
		player.pauseVideo();
	}

	player.setPlaybackQuality(selected);

	override_scroll_event(player);
}
})(window);
