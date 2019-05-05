'use strict';

(function() {
	{ // listen radiobuttons "change" event
		let radio_buttons = document.querySelectorAll('input[name=dispfmt]');
		for (let i = 0; i < radio_buttons.length; i++) {
			radio_buttons[i].addEventListener("change", function(e) {
				if (radio_buttons[i].checked) {
					browser.storage.local.set({"display_format": radio_buttons[i].value});
				}
			});
		}
	}


	document.addEventListener("DOMContentLoaded",  function() {
		// load current settings
		function setCurrentChoice(result) {
			const config_value = result.display_format || "24";
			let radio_buttons = document.querySelectorAll('input[name=dispfmt]');
			for (let i = 0; i < radio_buttons.length; i++) {
				radio_buttons[i].checked = (radio_buttons[i].value == config_value);
			}
		}
		function onError(error) {
			console.log(`Error: ${error}`);
		}
		var getting = browser.storage.local.get("display_format");
		getting.then(setCurrentChoice, onError);
	});
})();
