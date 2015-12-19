var storage = chrome.storage.sync;

function save_options() {
  var select = document.getElementById("quality");
  var quality = select.children[select.selectedIndex].value;
  storage.set({
  	"yt_preferred_quality": quality
  }, function () {
  	  var status = document.getElementById("status");
	  status.innerHTML = "Options Saved.";
	  setTimeout(function() {
	    status.innerHTML = "";
	  }, 1000);
  });
}

function restore_options() {
	storage.get("yt_preferred_quality", function (items) {
		var quality = items.yt_preferred_quality;
		if (!quality)
			return;

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