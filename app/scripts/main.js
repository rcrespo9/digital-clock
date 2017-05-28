'use strict';

(function() {
	const clock = () => {
		// clock variables
		const $clock = document.getElementById('js-clock');
		const activeClass = 'active';

		const setTimePeriod = () => { $clock.querySelector( `#${moment().format('a')}`).classList.add(activeClass) };
		const setDay = () => { $clock.querySelector( `.clock__day[data-day="${moment().day()}"]` ).classList.add(activeClass) };

		// alarm variables
		const $alarmSetup = $clock.querySelector('#clock-alarm-form');
		const $alarmAudio = new Audio('../extras/alarm-clock.mp3');
		const $alarmBtn = $clock.querySelector('#alarm-btn');
		const $alarmColon = $clock.querySelector('#alarm-colon');

		const $saveAlarmBtn = $clock.querySelector('#save-alarm');
		const $resetAlarmBtn = $clock.querySelector('#reset-alarm');
		const $cancelAlarmBtn = $clock.querySelector('#cancel-alarm');

		const $alarmInputs = $clock.querySelectorAll('input');
		const $alarmTextInputs = $clock.querySelectorAll('.alarm__input');

		const ringingAlarmBtnClass = 'time__alarm-btn--ringing';
		const openAlarmClass = 'clock__alarm--active';
		const activeAlarmBtnClass = 'time__alarm-btn--active';
		const inactiveAlarmColClass = 'alarm__col--inactive';

		const closeAlarmSetup = () => { $alarmSetup.classList.remove(openAlarmClass) };
		const toggleAlarmCol = () => {  }

		let alarmTime = '';
		let isAlarmRinging = false;

		// clock functions
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

			if(moment().format('hh:mm a') === alarmTime && alarmTime.length) {
				isAlarmRinging = true;
				$alarmBtn.classList.add(ringingAlarmBtnClass);
				$alarmAudio.play();
				closeAlarmSetup();
			}
		}

		// alarm functions
		function resetAlarm() {
			alarmTime = '';

			$alarmSetup.reset();

			$alarmBtn.classList.remove(activeAlarmBtnClass);
			$alarmColon.classList.add(inactiveAlarmColClass);
		}

		function toggleAlarm() {
			if(isAlarmRinging) {
				isAlarmRinging = false;

				$alarmAudio.pause();
				$alarmAudio.currentTime = 0;

				$alarmBtn.classList.remove(ringingAlarmBtnClass);
				resetAlarm();
			} else {
				$alarmSetup.classList.add(openAlarmClass);
			}
		};

		function setAlarm() {
			$alarmSetup.onsubmit = () => { return false; }

			if($alarmSetup.checkValidity()) {
				const $alarmHours = $clock.querySelector('#alarm-hours');
				const $alarmMinutes = $clock.querySelector('#alarm-minutes');
				const $alarmRadioChecked = $clock.querySelector('input[type="radio"]:checked');

				alarmTime = `${$alarmHours.value}:${$alarmMinutes.value} ${$alarmRadioChecked.value}`;

				$alarmColon.classList.remove(inactiveAlarmColClass);
				$alarmBtn.classList.add(activeAlarmBtnClass);

				closeAlarmSetup();
			}
		}

		function twoDigitFormat() {
			if(this.value.length === 1) {
				this.value = '0' + this.value;
			}
		}

		function highlightAlarmCol() {
			if(this.value.length) {
				$alarmColon.classList.remove(inactiveAlarmColClass);
			} else {
				$alarmColon.classList.add(inactiveAlarmColClass);
			}
		}

		// public functions
		return {
			init: () => {
				setInterval(setTime, 1000);

				$alarmBtn.addEventListener('click', toggleAlarm);
				$saveAlarmBtn.addEventListener('click', setAlarm);
				$resetAlarmBtn.addEventListener('click', resetAlarm);
				$cancelAlarmBtn.addEventListener('click', closeAlarmSetup);

				Array.from($alarmTextInputs).forEach(function(el) {
					el.addEventListener('change', twoDigitFormat);
					el.addEventListener('keyup', highlightAlarmCol);
				});
			}
		};
	};

	function init() {
		const newClock = clock();
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