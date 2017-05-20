'use strict';

(function() {
	const clock = {
		setTime() {
			console.log('Time is set!');
		}
	};

	function factoryClock() {
		return Object.create(clock);
	}

	function init() {
		const newClock = factoryClock();
		newClock.setTime();
	}

	function ready(fn) {
	  if (document.readyState != 'loading'){
	    fn();
	  } else {
	    document.addEventListener('DOMContentLoaded', fn);
	  }
	}

	ready(init);
})();