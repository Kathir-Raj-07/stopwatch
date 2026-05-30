let min = 0;
let sec = 0;
let ms = 0;
let timer = null;
const laps = [];

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecDisplay = document.getElementById("millisec");
const lapsContainer = document.getElementById("laps-list");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");

function updateDisplay() {
    minutesDisplay.textContent = min < 10 ? "0" + min : min;
    secondsDisplay.textContent = sec < 10 ? "0" + sec : sec;
    millisecDisplay.textContent = ms < 10 ? "0" + ms : ms;
}

function formatTime(m, s, ms) {
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}:${ms < 10 ? "0" + ms : ms}`;
}

startBtn.addEventListener("click", () => {
    if (timer !== null) return;
    startBtn.disabled = true;
    timer = setInterval(() => {
        ms++;
        if (ms === 100) {
            ms = 0;
            sec++;
        }
        if (sec === 60) {
            sec = 0;
            min++;
        }
        updateDisplay();
    }, 10);
});
//
stopBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    startBtn.disabled = false;
});

lapBtn.addEventListener("click", () => {
    if (timer === null && ms === 0 && sec === 0 && min === 0) return;

    const lapTime = formatTime(min, sec, ms);
    laps.push(lapTime);

    const lapElement = document.createElement("div");
    lapElement.className = "lap-item";
    lapElement.innerHTML = `
        <span class="lap-number">Lap ${laps.length}</span>
        <span class="lap-time">${lapTime}</span>
    `;
    lapsContainer.prepend(lapElement);
});

resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    min = 0;
    sec = 0;
    ms = 0;
    laps.length = 0;
    lapsContainer.innerHTML = "";
    updateDisplay();
    startBtn.disabled = false;
});

updateDisplay();
