'use strict';

(function() {
	const BADGE_COLOR = "#000000";
	var CFG_DISP_FORMAT = "24";

	function updateClock() {
		const date = new Date();
		const mm = date.getMinutes().toString().padStart(2, "0");
		let hour_value = date.getHours();
		if (CFG_DISP_FORMAT == "12") {
			if (hour_value >= 12) {
				hour_value -= 12;
			}
			if (hour_value == 0) {
				hour_value = 12;
			}
		}
		const hh = hour_value.toString().padStart(2, "0");

		browser.browserAction.setBadgeText({text:hh + mm});
		browser.browserAction.setTitle({title:date.toLocaleDateString()});
	}
	browser.browserAction.setBadgeBackgroundColor({color:BADGE_COLOR})

	function getNextTimeout() {
		const now = Date.now();
		const min1 = (60 * 1000);
		const next = ((now + (min1 - 1)) / min1) | 0;
		return ((next * min1) - now) + 500; // add delay 0.5 s
	};

	function callback() {
		updateClock();
		setTimeout(callback, getNextTimeout());
	};

	// read configs
	browser.storage.local.get("display_format").then(
		function(result) {
			CFG_DISP_FORMAT = result.display_format;
			updateClock();
		},
		function(error) { console.log(`Error: ${error}`); }
	);
	browser.storage.onChanged.addListener(function(changes, areaName) {
		if (areaName == "local") {
			CFG_DISP_FORMAT = changes.display_format.newValue;
			updateClock();
		}
	});

	callback();
})();
