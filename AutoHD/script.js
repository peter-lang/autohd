(function() {
var yt_player = false;
function overrideScrollWheel(player) {
	var d_vol = 0,
		vm = document.createElement('div'),
		prev_timeout = 0,
		movie_player = document.getElementById('movie_player');

	player = player || yt_player;
	if (!player) {
		return;
	}
	if (!yt_player) {
		yt_player = player;
	}

	if (document.getElementById('volume_meter')) {
		return;
	}

	vm.id = 'volume_meter';
	vm.style.cssText = 'position:fixed;right:20px;top:70px;z-index:9999;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:36px;color:#FFFFFF;text-shadow:2px 2px 8px #000000;';
	vm.classList.add('volume_meter');
	vm.classList.add('hide');
	vm.innerHTML = '&nbsp;';
	
	movie_player.appendChild(vm);
	movie_player.onwheel = function(e) {
		if (!document.getElementById('movie_player').classList.contains('ytp-fullscreen')) {
			return true;
		}

		e.preventDefault();
		if (2*Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
			d_vol += e.deltaY;
			var modulus = parseInt(d_vol / yt_sensitivity);
			if (modulus) {
				var volume = player.getVolume() + (yt_invert_y ? -modulus : modulus) * 5;
				player.setVolume(Math.min(Math.max(volume, 0), 100));
				d_vol -= modulus*yt_sensitivity;
				vm.innerHTML = player.getVolume() + '%';

				if (prev_timeout) {
					clearTimeout(prev_timeout);
					prev_timeout = 0;
				}
				vm.classList.remove('hide');
				prev_timeout = setTimeout(function() {
					vm.classList.add('hide');
					prev_timeout = 0;
				}, 1000);
			}
		}
	};
}


window.onPlayerStateChange = function (event) {
	if (yt_sensitivity) {
		overrideScrollWheel();
	}
}

window.onYouTubePlayerReady = function (player) {
	if (!player)
		return;

	var selected = (function(player) {
		if (yt_preferred_quality === 'best') {
			return player.getAvailableQualityLevels()[0];
		} else {
			return yt_preferred_quality;
		}
	})(player);

	var featured_video = (function() {
		return new RegExp("^\/(user|channel)\/").test(window.location.pathname);
	})();

	if (featured_video && yt_pause_featured_video) {
		player.pauseVideo();
	}

	player.setPlaybackQuality(selected);
	player.addEventListener('onStateChange', 'onPlayerStateChange');

	if (yt_sensitivity) {
		overrideScrollWheel(player);
	}
}
})();