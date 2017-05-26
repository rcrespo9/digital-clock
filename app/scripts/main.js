'use strict';

(function() {
	const clock = () => {
		const $clock = document.getElementById('js-clock');
		const $alarmSetup = $clock.querySelector('#clock-alarm');
		const $alarmAudio = $clock.querySelector('#alarm-audio');
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

			if(moment().format('hh:mm a') === alarmTime && alarmTime.length) {
				console.log('Alarm ringing!');
				$alarmAudio.play();
			}
		}

		const openAlarmClass = 'clock__alarm--active';
		const activeAlarmBtnClass = 'time__alarm-btn--active';

		const $alarmBtn = $clock.querySelector('#alarm-btn');
		const $saveAlarmBtn = $clock.querySelector('#save-alarm');
		const $resetAlarmBtn = $clock.querySelector('#reset-alarm');
		const $cancelAlarmBtn = $clock.querySelector('#cancel-alarm');

		const $alarmHours = $clock.querySelector('#alarm-hours');
		const $alarmMinutes = $clock.querySelector('#alarm-minutes');

		const openAlarmSetup = () => { $alarmSetup.classList.add(openAlarmClass) };
		const closeAlarmSetup = () => { $alarmSetup.classList.remove(openAlarmClass) };

		function resetAlarm() {
			const $alarmRadioChecked = $clock.querySelector('input[type="radio"]:checked');

			alarmTime = '';

			$alarmHours.value = '';
			$alarmMinutes.value = '';

			if($alarmRadioChecked !== null) {
				$alarmRadioChecked.checked = false;
			}

			$alarmBtn.classList.remove(activeAlarmBtnClass);
		}

		function setAlarm() {
			const $alarmRadioChecked = $clock.querySelector('input[type="radio"]:checked');

			if($alarmHours.value && $alarmMinutes.value && $alarmRadioChecked.value) {
				alarmTime = `${$alarmHours.value}:${$alarmMinutes.value} ${$alarmRadioChecked.value}`;
				$alarmBtn.classList.add(activeAlarmBtnClass);

				closeAlarmSetup();
				console.log(alarmTime);
			}
		}

		return {
			init: () => {
				setInterval(setTime, 1000);
				$alarmBtn.addEventListener('click', openAlarmSetup);
				$saveAlarmBtn.addEventListener('click', setAlarm);
				$resetAlarmBtn.addEventListener('click', resetAlarm);
				$cancelAlarmBtn.addEventListener('click', closeAlarmSetup);

			}
		}
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