// ==UserScript==
// @name        Youtube playback rate changer
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/watch
// @grant       none
// @version     1.2.3
// @author      -
// @downloadURL https://raw.githubusercontent.com/1256-bits/yt-speed-control/main/script.js
// @updateURL https://raw.githubusercontent.com/1256-bits/yt-speed-control/main/script.js
// @description Adds controls for adjusting video speed beyond 2x
// ==/UserScript==

const video = document.querySelector("video");
const videoContainer = document.querySelector("#movie_player");
const controlBox = document.createElement("div")
controlBox.innerHTML = `<span id="ytSpeedDown">&lt;&lt;</span>
                        <span id="ytSpeedStatus">${video.playbackRate}</span>
                        <span id="ytSpeedUp">&gt;&gt;</span>`
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
const speedStatus = document.querySelector("#ytSpeedStatus");

speedUp.addEventListener("click", incrementSpeed);
speedStatus.addEventListener("click", resetSpeed);
speedDown.addEventListener("click", decrementSpeed);
document.addEventListener("keydown", (e) => {
    if (e.key === "+")
        incrementSpeed()
    if (e.key === "-")
        decrementSpeed()
    if (e.key === "=")
        video.playbackRate = 1;
});

function incrementSpeed() {
    if (video.playbackRate < 5) {
        video.playbackRate += 0.25;
        updateStatus();
    }
};

function decrementSpeed() {
    if (video.playbackRate > 0.25) {
        video.playbackRate -= 0.25;
        updateStatus();
    }
};

function resetSpeed() {
    video.playbackRate = 1;
    updateStatus();
}

function updateStatus() {
    speedStatus.textContent = video.playbackRate;
}

/* TODO
    * Style
*/
