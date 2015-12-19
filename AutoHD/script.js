window.onYouTubePlayerReady = function(player) {
	if (!player)
		return;

	var selected;

	if (yt_preferred_quality === 'best') {
		selected = player.getAvailableQualityLevels()[0];
	} else {
		selected = yt_preferred_quality;
	}

	player.setPlaybackQuality(selected);
}