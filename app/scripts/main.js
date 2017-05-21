'use strict';

(function() {
	const clock = (clockEl) => {
		const $clock = document.getElementById(clockEl);
		const activeClass = 'active';

		const setTimePeriod = () => { $clock.querySelector( `#${moment().format('a')}`).classList.add(activeClass) };
		const setDay = () => { $clock.querySelector( `.clock__day[data-day="${moment().day()}"]` ).classList.add(activeClass) };

		let alarmTime = '';

		function setTime() {
			const $timeDigits = $clock.querySelector('#time-digits');
			const $hours = $clock.querySelector('#hours');
			const $minutes = $clock.querySelector('#minutes');
			const $seconds = $clock.querySelector('#seconds');

			$hours.innerHTML = moment().format('hh');
			$minutes.innerHTML = moment().format('mm');
			$seconds.innerHTML = moment().format('ss');

			$timeDigits.setAttribute('datetime', moment().format('hh:mm:ss'));

			setTimePeriod();
			setDay();
		}

		return {
			init: () => {
				setInterval(setTime, 1000);
				console.log()
			}
		}
	};

	function init() {
		const newClock = clock('js-clock');
		newClock.init();
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