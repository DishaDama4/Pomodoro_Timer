// JavaScript code :-
let timer; // Variable to store the timer
let isRunning = false; // Flag to check if timer is running
let workDuration = 25 * 60; // Total work time in seconds (25 minutes)
let short_Break_Duration = 5 * 60; // Short break time in seconds (5 minutes)
let long_Break_Duration = 10 * 60; // Short break time in seconds (5 minutes)
let timeRemaining = workDuration; // Time remaining
let isBreakTime = false; // Flag to check if it's break time

const ringtone=document.getElementById("ringtone");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
//const statusDisplay = document.getElementById("status"); //Commented out

function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateDisplay();
            } else {
                clearInterval(timer);
                if (isBreakTime) {
                    alert("Break time is over! Get back to work.");
                    timeRemaining = workDuration; // Set back to work duration
                    //statusDisplay.textContent = "Work Time"; //Commented out
                } else {
                    // alert("Time's up! Take a break.");
                    timeRemaining = short_Break_Duration; // Set to break duration
                    //statusDisplay.textContent = "Break Time"; //Commented out
                }
                isBreakTime = !isBreakTime; // Toggle between work and break
                updateDisplay();
                playSound();    // Plays the ringtone when time ends 
                startTimer(); // Automatically start the next session
            }
        }, 1000);
    }
}
 
function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function restartTimer() {
    stopTimer(); // Stop any ongoing timer
    timeRemaining = workDuration; // Reset to initial work duration
    isBreakTime = false; // Reset break flag
    //statusDisplay.textContent = "Work Time"; // Reset status display //Commented out
    updateDisplay(); // Update display to show initial time

}

// New function to add extra 5 minutes
function increase_time() {
    timeRemaining += 5 * 60; // Add 5 minutes in seconds
    updateDisplay(); // Update display to show new time
}
function decrese_time() {
    if(timeRemaining > 15*60){
    timeRemaining -= 5 * 60; // Less 5 mins in seconds
    updateDisplay();
    }
    else{
        alert("Minimum working time is 15 mins");
    }
}

//Function for Long Break
function longBreak() {
    stopTimer(); // Stop any ongoing timer before starting a break
    timeRemaining = long_Break_Duration; // Set to long break duration (10 minutes)
    isBreakTime = true; // Set break flag to true
    updateDisplay(); // Update display for long break
}

//Function for short break
function shortBreak() {
    stopTimer(); // Stop any ongoing timer before starting a break
    timeRemaining = short_Break_Duration; // Set to short break duration (5 minutes)
    isBreakTime = true; // Set break flag to true
    updateDisplay(); // Update display for long break
}

//To play the ringtone after the completion of the time 
function playSound() {
    ringtone.play();  // Start playing the ringtone

    // Stop the ringtone after 10 seconds
    setTimeout(() => {
        ringtone.pause();  // Pause the ringtone
        ringtone.currentTime = 0; // Reset the playback to the beginning
    }, 10000);
} 

// Event listeners for buttons
document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("stopBtn").addEventListener("click", stopTimer);
document.getElementById("restartBtn").addEventListener("click", restartTimer);
document.getElementById("add").addEventListener("click", increase_time); // Event listener for the new button
document.getElementById("less").addEventListener("click", decrese_time);
document.getElementById("shortBreakBtn").addEventListener("click", shortBreak); 
document.getElementById("longBreakBtn").addEventListener("click", longBreak);

// Initial display update
updateDisplay(); // Call this after defining the function

//Logic for the to-do list 
 // Logic for the to-do list
let inputs = document.getElementById("inp");
let text = document.querySelector(".text");

function add() {
    if (inputs.value == "") {
        alert("Please enter the task ");
    } else {
        let newEle = document.createElement("ul");
        newEle.innerHTML = `${inputs.value} 
            <button class="edit"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                    <path d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    <path d="M13 4L20 11" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    <path d="M14 22L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
              <button class="delete"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                    <path d="M3.25 5H8.67963C9.34834 5 9.9728 4.6658 10.3437 4.1094L11.1563 2.8906C11.5272 2.3342 12.1517 2 12.8204 2H17.3085C18.1693 2 18.9336 2.55086 19.2058 3.36754L19.75 5M21.25 5H8.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M19.75 5L19.1303 14.906C19.1088 15.2333 19.0887 15.5385 19.0685 15.8235M4.75 5L5.35461 14.8966C5.50945 17.3107 5.58688 18.5177 6.22868 19.3857C6.546 19.8149 6.9548 20.1771 7.42905 20.4493C8.3883 21 9.67312 21 12.2427 21H14.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M20.25 19C20.25 17.3431 18.9069 16 17.25 16C15.5931 16 14.25 17.3431 14.25 19C14.25 20.6569 15.5931 22 17.25 22C18.9069 22 20.25 20.6569 20.25 19Z" stroke="currentColor" stroke-width="1.5" />
                </svg>
            </button>`;
        text.appendChild(newEle);
        inputs.value = "";

        newEle.querySelector(".delete").addEventListener("click", remove);
        function remove() {
            newEle.remove();
        }

        newEle.querySelector(".edit").addEventListener("click", editTask);
        function editTask() {
            let newTask = prompt("Edit your task:", newEle.textContent.replace(" ", "").replace("Delete", "").replace("Edit", "").trim());
            if (newTask !== null && newTask !== "") {
                newEle.innerHTML = `${newTask} 
                    <button class="delete"> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                            <path d="M3.25 5H8.67963C9.34834 5 9.9728 4.6658 10.3437 4.1094L11.1563 2.8906C11.5272 2.3342 12.1517 2 12.8204 2H17.3085C18.1693 2 18.9336 2.55086 19.2058 3.36754L19.75 5M21.25 5H8.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M19.75 5L19.1303 14.906C19.1088 15.2333 19.0887 15.5385 19.0685 15.8235M4.75 5L5.35461 14.8966C5.50945 17.3107 5.58688 18.5177 6.22868 19.3857C6.546 19.8149 6.9548 20.1771 7.42905 20.4493C8.3883 21 9.67312 21 12.2427 21H14.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M20.25 19C20.25 17.3431 18.9069 16 17.25 16C15.5931 16 14.25 17.3431 14.25 19C14.25 20.6569 15.5931 22 17.25 22C18.9069 22 20.25 20.6569 20.25 19Z" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                    </button>
                    <button class="edit"> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                            <path d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    <path d="M13 4L20 11" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    <path d="M14 22L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
                `;
                newEle.querySelector(".delete").addEventListener("click", remove);
                newEle.querySelector(".edit").addEventListener("click", editTask);
            }
        }
    }
}
document.getElementById("task").addEventListener("click", add);


// Work done by the user 
function task_complete() {
    if (!isRunning) { // Check if the timer has started
        alert("Please start the timer before marking the task as done!");
        return;
    }
    alert("Congrats! You have completed your task.");
}
function task_incomplete() {
    if (!isRunning) { // Check if the timer has started
        alert("Please start the timer before marking the task as not done!");
        return;
    }
    alert("Try again to complete the task.");
}
document.getElementById("okk").addEventListener("click", task_complete);
document.getElementById("not_okk").addEventListener("click", task_incomplete);   

