// Timer variables
let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

// DOM elements
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const totalTimeDisplay = document.getElementById('totalTime');
const totalSessionsDisplay = document.getElementById('totalSessions');
const recentSessionsContainer = document.getElementById('recentSessions');

// Storage keys
const STORAGE_KEY = 'meditationData';

// Load saved data from localStorage
function loadData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        return JSON.parse(savedData);
    }
    return {
        totalTime: 0,
        sessions: []
    };
}

// Save data to localStorage
function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Format time to HH:MM:SS
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Format date for display
function formatDate(date) {
    const options = { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit'
    };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Update stats display
function updateStats() {
    const data = loadData();
    totalTimeDisplay.textContent = formatTime(data.totalTime);
    totalSessionsDisplay.textContent = data.sessions.length;
    
    // Update recent sessions
    if (data.sessions.length > 0) {
        // Show only last 5 sessions
        const recentSessions = data.sessions.slice(-5).reverse();
        recentSessionsContainer.innerHTML = recentSessions.map(session => `
            <div class="bg-gray-50 rounded-lg px-4 py-2 flex justify-between items-center">
                <span class="text-sm text-gray-600">${formatDate(session.date)}</span>
                <span class="text-sm font-medium text-gray-800">${formatTime(session.duration)}</span>
            </div>
        `).join('');
    } else {
        recentSessionsContainer.innerHTML = '<p class="text-sm text-gray-400 text-center py-4">No sessions yet. Start meditating!</p>';
    }
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

// Stop timer and save session
function stopTimer() {
    if (isRunning) {
        isRunning = false;
        
        // Clear interval
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        
        // Save session if duration is more than 5 seconds
        if (elapsedTime > 5000) {
            const data = loadData();
            const session = {
                date: new Date().toISOString(),
                duration: elapsedTime
            };
            
            data.sessions.push(session);
            data.totalTime += elapsedTime;
            saveData(data);
            
            // Update stats display
            updateStats();
            
            // Show success message
            const duration = formatTime(elapsedTime);
            document.querySelector('.text-gray-500').textContent = `Great job! Session saved: ${duration}`;
        } else {
            document.querySelector('.text-gray-500').textContent = 'Session too short to save (min 5 seconds)';
        }
        
        // Update button states
        startBtn.disabled = false;
        stopBtn.disabled = true;
        
        // Update button styles
        startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        startBtn.classList.add('hover:scale-105');
        stopBtn.classList.add('opacity-50', 'cursor-not-allowed');
        
        // Reset for next session
        setTimeout(() => {
            elapsedTime = 0;
            timerDisplay.textContent = '00:00:00';
            document.querySelector('.text-gray-500').textContent = 'Press Start to begin your meditation session';
        }, 3000);
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

// Initialize stats on page load
updateStats(); 