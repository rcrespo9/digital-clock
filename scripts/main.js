"use strict";!function(){function e(){t().init()}var t=function(){function e(){var e=i.querySelector("#time-digits"),t=i.querySelector("#hours"),a=i.querySelector("#minutes"),r=i.querySelector("#seconds");t.innerHTML=moment().format("hh"),a.innerHTML=moment().format("mm"),r.innerHTML=moment().format("ss"),e.setAttribute("datetime",moment().format("hh:mm:ss")),o(),l(),moment().format("hh:mm a")===g&&g.length&&(E=!0,u.play(),m.classList.add(h),k())}function t(){g="",s.reset(),m.classList.remove(q),d.classList.add(_)}function a(){E?(E=!1,u.pause(),u.currentTime=0,m.classList.remove(h),t()):s.classList.add(S)}function r(){if(s.onsubmit=function(){return!1},s.checkValidity()){var e=i.querySelector("#alarm-hours"),t=i.querySelector("#alarm-minutes"),a=i.querySelector('input[type="radio"]:checked');g=e.value+":"+t.value+" "+a.value,d.classList.remove(_),m.classList.add(q),k()}}function n(){1===this.value.length&&(this.value="0"+this.value)}function c(){this.value.length?d.classList.remove(_):d.classList.add(_)}var i=document.getElementById("js-clock"),o=function(){i.querySelector("#"+moment().format("a")).classList.add("active")},l=function(){i.querySelector('.clock__day[data-day="'+moment().day()+'"]').classList.add("active")},s=i.querySelector("#clock-alarm-form"),u=i.querySelector("audio"),m=i.querySelector("#alarm-btn"),d=i.querySelector("#alarm-colon"),v=i.querySelector("#save-alarm"),y=i.querySelector("#reset-alarm"),f=i.querySelector("#cancel-alarm"),L=(i.querySelectorAll("input"),i.querySelectorAll(".alarm__input")),h="time__alarm-btn--ringing",S="clock__alarm--active",q="time__alarm-btn--active",_="alarm__col--inactive",k=function(){s.classList.remove(S)},g="",E=!1;return{init:function(){setInterval(e,1e3),m.addEventListener("click",a),v.addEventListener("click",r),y.addEventListener("click",t),f.addEventListener("click",k),Array.from(L).forEach(function(e){e.addEventListener("change",n),e.addEventListener("keyup",c)})}}};!function(e){"loading"!=document.readyState?e():document.addEventListener("DOMContentLoaded",e)}(e)}();