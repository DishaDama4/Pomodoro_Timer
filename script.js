let timer; // Variable to store the timer
let isRunning = false; // Flag to check if timer is running
let workDuration = 25 * 60; // Total work time in seconds (25 minutes)
let short_Break_Duration = 5 * 60; // Short break duration in seconds (5 minutes)
let long_Break_Duration = 10 * 60; // Long break duration in seconds (10 minutes)
let time_Remaining = workDuration; // Time remaining
let isBreakTime = false; // Flag to check if it's break time

const ringtone = document.getElementById("ringtone");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");

// Initialize the web worker
const worker = new Worker('timerWorker.js');

// Send initialization data to the worker
worker.postMessage({
    command: 'init',
    workDuration: workDuration,
    short_Break_Duration: short_Break_Duration,
    long_Break_Duration: long_Break_Duration,
});

// Handle messages from the worker
worker.onmessage = function(event) {
    const data = event.data;
    
    if (data.command === 'time_Remaining') {
        timeRemaining = data.timeRemaining;
        updateDisplay();
        
    } else if (data.command === 'breakOver' || data.command === 'timeUp') {
         playSound(); // Play the ringtone

    } else if (data.command === 'newSession') {
        isBreakTime = data.isBreakTime;
        time_Remaining = data.time_Remaining;
        updateDisplay();
        
        startTimer(); // Automatically start the next session
    }
};

function updateDisplay() {
    const minutes = Math.floor(time_Remaining / 60);
    const seconds = time_Remaining % 60;

    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        
        worker.postMessage({
            command: 'start',
            time_Remaining: time_Remaining,
            isBreakTime: isBreakTime,
        });
    }
}

function stopTimer() {
    worker.postMessage({ command: 'stop' });
    
    isRunning = false;
}

function restartTimer() {
    stopTimer(); // Stop any ongoing timer
    
    time_Remaining = workDuration; // Reset to initial work duration
    isBreakTime = false; // Reset break flag
    
    updateDisplay(); // Update display to show initial time
}

function increase_time() {
    time_Remaining += 5 * 60; // Add 5 minutes in seconds
    
    updateDisplay(); // Update display to show new time
    
    worker.postMessage({ command: 'increase', time_Remaining: time_Remaining });
}

function decrease_time() {
   if (time_Remaining > 5 * 60) { 
       time_Remaining -= 5 * 60; 
       updateDisplay(); 
       worker.postMessage({ command: 'decrease', 
       time_Remaining }); 
   } else { 
       alert("Minimum working duration is set to be at least five minutes."); 
   } 
}

// Functions for Long and Short Breaks
function long_break() { 
   stopTimer(); 
   time_Remaining=long_Break_Duration; 
   Is_break_time=true; 
   updateDisplay(); 
   Worker.postmessage({command:'startlongbreak'}); 
}

function short_break() { 
   stopTimer(); 
   time_Remaining=short_Break_Duration; 
   Is_break_time=true; 
   Update_display(); 
   Worker.postmessage({command:'startshortbreak'}); 
}

// Play the ringtone after completion of the timer.
function playSound() { 
   ringtone.play();

   setTimeout(() => { 
      ringtone.pause(); 
      ringtone.currentTime=0; 
   },5000); 
}

// Event listeners for buttons.
document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("stopBtn").addEventListener("click", stopTimer);
document.getElementById("restartBtn").addEventListener("click", restartTimer);
document.getElementById("add").addEventListener("click", increase_time);
document.getElementById("less").addEventListener("click", decrease_time);
document.getElementById("shortBreakBtn").addEventListener("click", short_break);
document.getElementById("longBreakBtn").addEventListener("click", long_break);

// Initial display update.
updateDisplay();

// Logic for the to-do list.
let inputs=document.getElementById("inp");
let text=document.querySelector(".text");

function add() { 
   if(inputs.value==="") { 
      alert("Please enter the task "); 
   } else { 
      let newEle=document.createElement("ul"); 
      newEle.innerHTML=`${inputs.value} <strong> X </strong>`; text.appendChild(newEle); inputs.value=""; newEle.querySelector("strong").addEventListener("click", remove); function remove() { newEle.remove(); } } } 

document.getElementById("task").addEventListener("click", add);

// Work done by the user.
function task_complete() { alert("Congrats! You have completed your task "); }

function task_incomplete() { alert("Try again to complete the task "); }

document.getElementById("okk").addEventListener("click", task_complete); document.getElementById("not_okk").addEventListener("click", task_incomplete);

