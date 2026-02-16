// Initialize starfield
function initStarfield() {
    const starfield = document.getElementById('starfield');
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starfield.appendChild(star);
    }

    // Add flying rockets
    const rocketCount = 3;
    for (let i = 0; i < rocketCount; i++) {
        const rocket = document.createElement('div');
        rocket.className = 'rocket';
        rocket.textContent = '🚀';
        
        const top = Math.random() * 80 + 10;
        const direction = Math.random() > 0.5 ? 'left' : 'right';
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 2;
        
        rocket.style.top = top + '%';
        rocket.style.animation = `fly${direction.charAt(0).toUpperCase() + direction.slice(1)} ${duration}s linear ${delay}s infinite`;
        
        if (direction === 'right') {
            rocket.style.transform = 'scaleX(-1)';
        }
        
        starfield.appendChild(rocket);
    }

    // Add flying astronauts
    const astronautCount = 2;
    for (let i = 0; i < astronautCount; i++) {
        const astronaut = document.createElement('div');
        astronaut.className = 'rocket';
        astronaut.textContent = '👨‍🚀';
        
        const top = Math.random() * 80 + 10;
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 3;
        
        astronaut.style.top = top + '%';
        astronaut.style.animation = `flyLeft ${duration}s linear ${delay}s infinite`;
        
        starfield.appendChild(astronaut);
    }

    // Add flying UFOs
    const ufoCount = 2;
    for (let i = 0; i < ufoCount; i++) {
        const ufo = document.createElement('div');
        ufo.className = 'rocket';
        ufo.textContent = '🛸';
        
        const position = Math.random() > 0.5 ? 'Down' : 'Up';
        const left = Math.random() * 80 + 10;
        const duration = Math.random() * 12 + 10;
        const delay = Math.random() * 4;
        
        ufo.style.left = left + '%';
        ufo.style.animation = `fly${position} ${duration}s linear ${delay}s infinite`;
        
        starfield.appendChild(ufo);
    }
}

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const completedCount = document.getElementById('completedCount');
const uncompletedCount = document.getElementById('uncompletedCount');
const totalCount = document.getElementById('totalCount');

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Add Task Function
function addTask() {
    const taskText = taskInput.value.trim();

    // Validation: prevent empty tasks
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create task element
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span class="task-text">${escapeHtml(taskText)}</span>
        <button class="delete-btn">Delete</button>
    `;

    // Add task to list
    taskList.appendChild(taskItem);

    // Clear input
    taskInput.value = '';
    taskInput.focus();

    // Update stats
    updateStats();

    // Add event listeners to new task
    attachTaskListeners(taskItem);
}

// Attach event listeners to task elements
function attachTaskListeners(taskItem) {
    const checkbox = taskItem.querySelector('.task-checkbox');
    const taskText = taskItem.querySelector('.task-text');
    const deleteBtn = taskItem.querySelector('.delete-btn');

    // Mark task as complete
    checkbox.addEventListener('change', () => {
        taskItem.classList.toggle('completed');
        updateStats();
    });

    // Toggle completion by clicking task text
    taskText.addEventListener('click', () => {
        checkbox.checked = !checkbox.checked;
        taskItem.classList.toggle('completed');
        updateStats();
    });

    // Delete task
    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
        updateStats();
    });
}

// Update stats display
function updateStats() {
    const total = taskList.children.length;
    const completed = document.querySelectorAll('.task-item.completed').length;
    const uncompleted = total - completed;

    completedCount.textContent = completed;
    uncompletedCount.textContent = uncompleted;
    totalCount.textContent = total;
}

// HTML escape function to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize stats on page load
updateStats();

// Initialize starfield on page load
initStarfield();
