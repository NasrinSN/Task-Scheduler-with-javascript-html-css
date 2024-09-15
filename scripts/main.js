// Function to display tasks
function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');

    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <h3>${task.name}</h3>
            <p>Category: ${task.category}</p>
            <p>Difficulty: ${task.difficulty}</p>
            <p>Due Date: ${task.dueDate}</p>
            <p><a href="${task.link}" target="_blank">Problem Link</a></p>
            <p>Status: 
                <select onchange="updateTaskStatus(${index}, this.value)">
                    <option value="Not Started" ${task.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                    <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            </p>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Function to delete a task
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1); // Remove the task from the array
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Update localStorage
    displayTasks(); // Refresh the task list display
}

// Function to update the status of a task
function updateTaskStatus(index, newStatus) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[index].status = newStatus; // Update the status of the task
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Update localStorage
    displayTasks(); // Refresh the task list display
}

// Event listener for form submission
document.getElementById('create-task').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const taskName = document.getElementById('task-name').value;
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    const dueDate = document.getElementById('due-date').value;
    const problemLink = document.getElementById('problem-link').value;

    // Create a task object
    const task = {
        name: taskName,
        category: category,
        difficulty: difficulty,
        dueDate: dueDate,
        link: problemLink,
        status: 'Not Started'
    };

    // Store the task (for now, we can use local storage)
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Reset the form
    this.reset();

    // Update the task list display
    displayTasks();
});

// Call displayTasks to show the tasks on page load
displayTasks();
