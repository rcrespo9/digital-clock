"use strict";!function(){function e(){t().init()}var t=function(){function e(){var e=i.querySelector("#time-digits"),t=i.querySelector("#hours"),a=i.querySelector("#minutes"),r=i.querySelector("#seconds");t.innerHTML=moment().format("hh"),a.innerHTML=moment().format("mm"),r.innerHTML=moment().format("ss"),e.setAttribute("datetime",moment().format("hh:mm:ss")),o(),l(),moment().format("hh:mm a")===g&&g.length&&(E=!0,u.classList.add(h),m.play(),_())}function t(){g="",s.reset(),u.classList.remove(q),d.classList.add(k)}function a(){E?(E=!1,m.pause(),m.currentTime=0,u.classList.remove(h),t()):s.classList.add(S)}function r(){if(s.onsubmit=function(){return!1},s.checkValidity()){var e=i.querySelector("#alarm-hours"),t=i.querySelector("#alarm-minutes"),a=i.querySelector('input[type="radio"]:checked');g=e.value+":"+t.value+" "+a.value,d.classList.remove(k),u.classList.add(q),_()}}function n(){1===this.value.length&&(this.value="0"+this.value)}function c(){this.value.length?d.classList.remove(k):d.classList.add(k)}var i=document.getElementById("js-clock"),o=function(){i.querySelector("#"+moment().format("a")).classList.add("active")},l=function(){i.querySelector('.clock__day[data-day="'+moment().day()+'"]').classList.add("active")},s=i.querySelector("#clock-alarm-form"),m=new Audio("../sounds/alarm-clock.mp3"),u=i.querySelector("#alarm-btn"),d=i.querySelector("#alarm-colon"),v=i.querySelector("#save-alarm"),y=i.querySelector("#reset-alarm"),f=i.querySelector("#cancel-alarm"),L=(i.querySelectorAll("input"),i.querySelectorAll(".alarm__input")),h="time__alarm-btn--ringing",S="clock__alarm--active",q="time__alarm-btn--active",k="alarm__col--inactive",_=function(){s.classList.remove(S)},g="",E=!1;return{init:function(){setInterval(e,1e3),u.addEventListener("click",a),v.addEventListener("click",r),y.addEventListener("click",t),f.addEventListener("click",_),Array.from(L).forEach(function(e){e.addEventListener("change",n),e.addEventListener("keyup",c)})}}};!function(e){"loading"!=document.readyState?e():document.addEventListener("DOMContentLoaded",e)}(e)}();