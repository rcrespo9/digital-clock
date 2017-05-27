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
		const $alarmAudio = $clock.querySelector('#alarm-audio');
		const $alarmBtn = $clock.querySelector('#alarm-btn');

		const $saveAlarmBtn = $clock.querySelector('#save-alarm');
		const $resetAlarmBtn = $clock.querySelector('#reset-alarm');
		const $cancelAlarmBtn = $clock.querySelector('#cancel-alarm');

		const $alarmInputs = $clock.querySelectorAll('input');
		const $alarmHours = $clock.querySelector('#alarm-hours');
		const $alarmMinutes = $clock.querySelector('#alarm-minutes');

		const ringingAlarmBtnClass = 'time__alarm-btn--ringing';
		const openAlarmClass = 'clock__alarm--active';
		const activeAlarmBtnClass = 'time__alarm-btn--active';

		const closeAlarmSetup = () => { $alarmSetup.classList.remove(openAlarmClass) };

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
				$alarmAudio.play();
				$alarmBtn.classList.add(ringingAlarmBtnClass);
			}
		}

		// alarm functions
		function resetAlarm() {
			alarmTime = '';

			Array.from($alarmInputs).forEach(function(el) {
				if(el.type === 'text' && el.value.length) {
					el.value = '';
				} elseif(el.type === 'radio' && el.checked) {
					el.checked = false;
				}
			});

			$alarmBtn.classList.remove(activeAlarmBtnClass);
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
				const $alarmRadioChecked = $clock.querySelector('input[type="radio"]:checked');

				alarmTime = `${$alarmHours.value}:${$alarmMinutes.value} ${$alarmRadioChecked.value}`;
				$alarmBtn.classList.add(activeAlarmBtnClass);

				closeAlarmSetup();
				console.log(`Alarm set for ${alarmTime}`);
			}
		}

		function twoDigitFormat() {
			if(this.value.length === 1) {
				this.value = '0' + this.value;
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

				$alarmHours.addEventListener('change', twoDigitFormat);
				$alarmMinutes.addEventListener('change', twoDigitFormat);
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