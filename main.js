const media = document.querySelector("video");
const controls = document.querySelector(".controls");

const play = document.querySelector(".play");
const stop = document.querySelector(".stop");
const rwd = document.querySelector(".rwd");
const fwd = document.querySelector(".fwd");

const timerWrapper = document.querySelector(".timer");
const timer = document.querySelector(".timer span");
const timerBar = document.querySelector(".timer div");

media.removeAttribute('controls');
controls.style.visibility = 'visible';

function playPauseMedia() {
    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);

    if(media.paused) {
        play.textContent = 'Pause';
        media.play();
    } else {
        play.textContent = 'Play';
        media.pause();
    }
}

function stopMedia() {
    media.pause();
    media.currentTime = 0;
    play.textContent = 'Play';
    
    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
}

let intervalFwd;
let intervalRwd;

function windBackward() {
    media.currentTime <= 3 ? stopMedia() : media.currentTime -= 3
}

function windForward() {
    media.currentTime >= media.duration - 3 ? stopMedia() : media.currentTime += 3
}

function mediaBackward() {
    clearInterval(intervalFwd);
    fwd.classList.remove("active");

    if(rwd.classList.contains("active")) {
        rwd.classList.remove("active");
        clearInterval(intervalRwd);
        media.play();
    } else {
        rwd.classList.add("active");
        media.pause();
        intervalRwd = setInterval(windBackward, 200);
    }
}

function mediaFordward() {
    clearInterval(intervalRwd);
    fwd.classList.remove("active");

    if(rwd.classList.contains("active")) {
        rwd.classList.remove("active");
        clearInterval(intervalFwd);
        media.play();
    } else {
        rwd.classList.add("active");
        media.pause();
        intervalRwd = setInterval(windForward, 200);
    }
}

function setTime() {
    let minutes = Math.floor(media.currentTime / 60);
    let seconds = Math.floor(media.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;

    minutes < 10 ? minuteValue = '0' + minutes : minuteValue = minutes
    seconds < 10 ? secondValue = '0' + seconds : secondValue = seconds

    let mediaTime = minuteValue + ':' + secondValue;
    timer.textContent = mediaTime;

    let barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
    timerBar.style.width = barLength + 'px';
}

play.addEventListener("click", playPauseMedia);
stop.addEventListener("click", stopMedia);
media.addEventListener("ended", stopMedia);

rwd.addEventListener("click", mediaBackward);
fwd.addEventListener("click", mediaFordward);

media.addEventListener("timeupdate", setTime);
