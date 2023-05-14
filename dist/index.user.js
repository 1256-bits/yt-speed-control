
// ==UserScript==
// @name        Youtube playback rate changer
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/watch
// @version     1.4.0
// @author      1256-bit
// @require     https://cdn.jsdelivr.net/combine/npm/@violentmonkey/dom@2,npm/@violentmonkey/ui@0.7
// @downloadURL https://github.com/1256-bits/yt-speed-control/raw/release/dist/index.user.js
// @updateURL   https://github.com/1256-bits/yt-speed-control/raw/release/dist/index.user.js
// @description Adds controls for adjusting video speed beyond 2x
// @grant       GM_addStyle
// ==/UserScript==

(function () {
'use strict';

var styles = {"controlBox":"style-module_controlBox__TmVIy","speedButton":"style-module_speedButton__7u8Lx","ytSpeedStatus":"style-module_ytSpeedStatus__WgE2G","left":"style-module_left__c5mo8","right":"style-module_right__MMN2R"};
var stylesheet=".style-module_controlBox__TmVIy{border-radius:1em;display:flex;font-size:1.3rem;left:5px;opacity:.7;position:absolute;top:5px;z-index:20}.style-module_controlBox__TmVIy:hover{opacity:1}.style-module_speedButton__7u8Lx{all:unset;background-color:grey;border:2px solid transparent;box-sizing:inherit;color:#fff;transition:all .1s linear}.style-module_speedButton__7u8Lx:hover{background-color:#4d4d4d;font-weight:700;text-shadow:1px 1px 2px #fff}.style-module_speedButton__7u8Lx:focus-visible{border:2px solid #000}.style-module_speedButton__7u8Lx:active{background-color:#737373;box-shadow:0 0 1px #000}#style-module_ytSpeedStatus__WgE2G{all:unset;background-color:#ccc;color:#000;padding:.1em;text-align:center;width:2em}#style-module_ytSpeedStatus__WgE2G:hover{background-color:#dfdfdf}#style-module_ytSpeedStatus__WgE2G:active{background-color:#ccc}.style-module_left__c5mo8{border-radius:1rem 0 0 1rem;box-shadow:-1px 0 1px rgba(0,0,0,.5)}.style-module_right__MMN2R{border-radius:0 1rem 1rem 0;box-shadow:1px 0 1px rgba(0,0,0,.5)}";

// CSS modules
document.head.append(VM.m(VM.h("style", null, stylesheet)));
const video = document.querySelector('video');
const videoContainer = document.querySelector('#movie_player');
const controlBox = document.createElement('div');
controlBox.classList.add(styles.controlBox);
controlBox.innerHTML = `<button class="${styles.speedButton} ${styles.left}" id="ytSpeedDown">&lt;&lt;</button>
                        <button id="${styles.ytSpeedStatus}">${video.playbackRate}</button>
                        <button class="${styles.speedButton} ${styles.right}" id="ytSpeedUp">&gt;&gt;</button>`;
videoContainer.prepend(controlBox);
const speedUp = document.querySelector('#ytSpeedUp');
const speedDown = document.querySelector('#ytSpeedDown');
const speedStatus = document.querySelector(`#${styles.ytSpeedStatus}`);
speedUp.addEventListener('click', incrementSpeed);
speedStatus.addEventListener('click', resetSpeed);
speedDown.addEventListener('click', decrementSpeed);
document.addEventListener('keydown', e => {
  if (e.key === '+') incrementSpeed();
  if (e.key === '-') decrementSpeed();
  if (e.key === '=') resetSpeed();
});
function incrementSpeed() {
  if (video.playbackRate < 5) {
    video.playbackRate += 0.25;
    updateStatus();
  }
}
function decrementSpeed() {
  if (video.playbackRate > 0.25) {
    video.playbackRate -= 0.25;
    updateStatus();
  }
}
function resetSpeed() {
  video.playbackRate = 1;
  updateStatus();
}
function updateStatus() {
  speedStatus.textContent = video.playbackRate;
}

})();
