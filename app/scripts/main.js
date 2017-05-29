'use strict';

(function() {
	window.mobilecheck = function() {
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	};

	const clock = () => {
		// clock variables
		const $clock = document.getElementById('js-clock');
		const activeClass = 'active';

		const setTimePeriod = () => { $clock.querySelector( `#${moment().format('a')}`).classList.add(activeClass) };
		const setDay = () => { $clock.querySelector( `.clock__day[data-day="${moment().day()}"]` ).classList.add(activeClass) };

		// alarm variables
		const $alarmSetup = $clock.querySelector('#clock-alarm-form');
		const $alarmAudio = new Audio('alarm-clock.mp3');
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

				if(window.mobilecheck() === false) {
					$alarmAudio.play();
				}

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