window.onYouTubePlayerReady = function(player) {
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
}