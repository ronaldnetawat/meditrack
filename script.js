// Timer variables
let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

// DOM elements
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

// Format time to HH:MM:SS
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update timer display
function updateTimer() {
    if (isRunning && startTime) {
        elapsedTime = Date.now() - startTime;
        timerDisplay.textContent = formatTime(elapsedTime);
    }
}

// Start timer
function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        isRunning = true;
        
        // Update button states
        startBtn.disabled = true;
        stopBtn.disabled = false;
        
        // Update button styles
        startBtn.classList.add('opacity-50', 'cursor-not-allowed');
        startBtn.classList.remove('hover:scale-105');
        stopBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        
        // Start interval to update display
        timerInterval = setInterval(updateTimer, 100);
        
        // Update instruction text
        document.querySelector('.text-gray-500').textContent = 'Focus on your breath...';
    }
}

// Stop timer
function stopTimer() {
    if (isRunning) {
        isRunning = false;
        
        // Clear interval
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        
        // Update button states
        startBtn.disabled = false;
        stopBtn.disabled = true;
        
        // Update button styles
        startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        startBtn.classList.add('hover:scale-105');
        stopBtn.classList.add('opacity-50', 'cursor-not-allowed');
        
        // Update instruction text with session duration
        const duration = formatTime(elapsedTime);
        document.querySelector('.text-gray-500').textContent = `Session completed: ${duration}`;
        
        // Reset for next session
        setTimeout(() => {
            elapsedTime = 0;
            timerDisplay.textContent = '00:00:00';
            document.querySelector('.text-gray-500').textContent = 'Press Start to begin your meditation session';
        }, 5000);
    }
}

// Event listeners
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);

// Handle page visibility changes (pause timer when tab is hidden)
document.addEventListener('visibilitychange', () => {
    if (document.hidden && isRunning) {
        // Page is hidden, store the current elapsed time
        elapsedTime = Date.now() - startTime;
    } else if (!document.hidden && isRunning) {
        // Page is visible again, restore the timer
        startTime = Date.now() - elapsedTime;
    }
}); 