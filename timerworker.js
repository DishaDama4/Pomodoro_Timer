let timerInterval;
let timeRemaining; // Corrected variable name
let  is_BreakTime; // Declare once here
let  work_Duration;
let shortBreakDuration = 5 * 60; // 5 minutes
let longBreakDuration = 10 * 60; // 10 minutes
let workSessionCount = 0;

self.onmessage = function(event) {
    const data = event.data;

    if (data.command === 'init') {
         work_Duration = data. work_Duration;
        shortBreakDuration = data.short_Break_Duration;
        longBreakDuration = data.long_Break_Duration;
    }

    if (data.command === 'start') {
        timeRemaining = data.timeRemaining; // Corrected variable name
         is_BreakTime = data. is_BreakTime;

        if (timeRemaining < 0) {
            // console.error("Invalid timeRemaining value:", timeRemaining);
            timeRemaining =  work_Duration; // Reset if invalid
        }

        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                self.postMessage({ timeRemaining: timeRemaining });
            } else {
                clearInterval(timerInterval);
                if ( is_BreakTime) {
                    self.postMessage({ command: 'breakOver' });
                    timeRemaining =  work_Duration; // Reset for next work session
                    workSessionCount = 0; // Reset session count after long break
                } else {
                    self.postMessage({ command: 'timeUp' });
                    workSessionCount++;
                    if (workSessionCount % 4 === 0) { // Every 4th session, take a long break
                        timeRemaining = longBreakDuration;
                    } else {
                        timeRemaining = shortBreakDuration;
                    }
                }
                 is_BreakTime = ! is_BreakTime; // Toggle between work and break
                self.postMessage({ command: 'newSession',  is_BreakTime:  is_BreakTime, timeRemaining: timeRemaining });
            }
        }, 1000);
    }

    if (data.command === 'stop') {
        clearInterval(timerInterval);
    }

    if (data.command === 'increase') {
        timeRemaining += 5 * 60; // Add 5 minutes in seconds
        self.postMessage({ timeRemaining: timeRemaining });
    }

    if (data.command === 'decrease') {
        if (timeRemaining > 5 * 60) {
            timeRemaining -= 5 * 60; // Subtract 5 minutes in seconds
            self.postMessage({ timeRemaining: timeRemaining });
        }
    }

    if (data.command === 'reset') {
        clearInterval(timerInterval);
        timeRemaining =  work_Duration;
         is_BreakTime = false; // Assign false here
        self.postMessage({ timeRemaining: timeRemaining,  is_BreakTime:  is_BreakTime });
    }

    if (data.command === 'startLongBreak') {
        clearInterval(timerInterval);
        timeRemaining = longBreakDuration;
         is_BreakTime = true; // Assign true here
        startTimer();
    }

    if (data.command === 'startShortBreak') {
        clearInterval(timerInterval);
        timeRemaining = shortBreakDuration;
         is_BreakTime = true; // Assign true here
        startTimer();
    }
};

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            self.postMessage({ timeRemaining: timeRemaining });
        } else {
            clearInterval(timerInterval);
            if ( is_BreakTime) {
                self.postMessage({ command: 'breakOver' });
                timeRemaining =  work_Duration; // Reset for next work session
                workSessionCount = 0; // Reset session count after long break
            } else {
                self.postMessage({ command: 'timeUp' });
                workSessionCount++;
                if (workSessionCount % 4 === 0) { // Every 4th session, take a long break
                    timeRemaining = longBreakDuration;
                } else {
                    timeRemaining = shortBreakDuration;
                }
            }
             is_BreakTime = ! is_BreakTime; // Toggle between work and break
            self.postMessage({ command: 'newSession',  is_BreakTime:  is_BreakTime, timeRemaining: timeRemaining });
        }
    }, 1000);
}
