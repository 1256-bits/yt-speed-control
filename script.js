// ==UserScript==
// @name        Youtube playback rate changer
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/watch
// @grant       none
// @version     1.0
// @author      -
// @downloadURL https://raw.githubusercontent.com/1256-bits/yt-speed-control/main/script.js
// @updateURL https://raw.githubusercontent.com/1256-bits/yt-speed-control/main/script.js
// @description Adds controls for adjusting video speed beyond 2x
// ==/UserScript==

const video = document.querySelector("video");
const videoContainer = document.querySelector("#movie_player");
const controlBox = document.createElement("div")
controlBox.innerHTML = `<span id="ytSpeedDown">&lt;&lt;</span>
                        <span id="ytSpeedStatus">ababa</span>
                        <span id="ytSpeedUp">&gt;&gt;</span>`
console.log(videoContainer, video, controlBox);
videoContainer.prepend(controlBox);
controlBox.style.cssText = `position: absolute;
                            top: 0;
                            left: 0;
                            color: red;
                            background: hotpink;
                            z-index: 20;
                            cursor: pointer;
                            font-size: 2rem`;
const speedUp = document.querySelector("#ytSpeedUp");
const speedDown = document.querySelector("#ytSpeedDown");
const speedStatus = document.querySelector("#ytSpeedUp");

speedUp.addEventListener("click", () => {
    if (video.playbackRate >= 5)
        return video.playbackRate += 0.25;
});
speedStatus.addEventListener("click", () => video.playbackRate = 1);
speedDown.addEventListener("click", () => {
    if (video.playbackRate <= 0.25)
        return video.playbackRate -= 0.25;
});

/* TODO
    * + and - keys change speed
    * Style
*/
