// CSS modules
import styles, { stylesheet } from './style.module.css';
document.head.append(VM.m(<style>{stylesheet}</style>));

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
document.addEventListener('keydown', (e) => {
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
