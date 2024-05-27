let timer;
let startTime;
let updatedTime;
let difference;
let isRunning = false;
let elapsedTime = 0;
let lapCounter = 1;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTime = new Date().getTime() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'stop';
        isRunning = true;
    } else {
        clearInterval(timer);
        elapsedTime = new Date().getTime() - startTime;
        startStopBtn.textContent = 'Start';
        isRunning = false;
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    startStopBtn.textContent = 'Start';
    updateDisplay(0);
    lapsList.innerHTML = '';
    lapCounter = 1;
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCounter++}: ${formatTime(difference)}`;
        lapsList.appendChild(li);
    }
});

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    minutesDisplay.textContent = formatTimeUnit(minutes);
    secondsDisplay.textContent = formatTimeUnit(seconds);
    millisecondsDisplay.textContent = formatTimeUnit(milliseconds);
}

function formatTimeUnit(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

function formatTime(time) {
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}:${formatTimeUnit(milliseconds)}`;
}
