'use strict';

(function() {
	const BADGE_COLOR = "#000000";

	function updateClock() {
		const date = new Date();
		const mm = date.getMinutes().toString().padStart(2, "0");
		const hh = date.getHours().toString().padStart(2, "0");
		browser.browserAction.setBadgeText({text:hh + mm});
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
	callback();
})();
