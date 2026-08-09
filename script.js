// Default starting tasks as specified in requirement NFR005
const defaultTasks = [
  { task: "Go to the mall", done: true },
  { task: "Clean my house", done: false }
];

// Initialize tasks from localStorage or default state
let tasks = [];
try {
  const storedTasks = localStorage.getItem('task_do_it_tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  } else {
    tasks = [...defaultTasks];
  }
} catch (e) {
  console.error("Failed to load tasks from local storage. Falling back to defaults.", e);
  tasks = [...defaultTasks];
}

// Select DOM elements
const tasksList = document.getElementById('tasks-list');
const addTaskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');

/**
 * Persists the current state of tasks array to localStorage.
 */
function saveTasks() {
  try {
    localStorage.setItem('task_do_it_tasks', JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks to local storage.", e);
  }
}

/**
 * Renders the task items dynamically.
 */
function renderTasks() {
  // Clear the existing list before rebuilding
  tasksList.innerHTML = '';

  if (tasks.length === 0) {
    // Optional: Render a beautiful empty state when no tasks are present
    const emptyState = document.createElement('li');
    emptyState.className = 'task-card';
    emptyState.style.justifyContent = 'center';
    emptyState.style.color = '#94a3b8';
    emptyState.style.fontSize = '1.4rem';
    emptyState.style.padding = '3rem';
    emptyState.innerHTML = '✨ No tasks left! Add a task to get started.';
    tasksList.appendChild(emptyState);
    return;
  }

  tasks.forEach((taskObj, index) => {
    // Create task list card (NFR004: Use cards to display the tasks)
    const li = document.createElement('li');
    li.className = 'task-card';
    li.dataset.index = index;

    // Left container for status toggle and task label
    const leftSection = document.createElement('div');
    leftSection.className = 'task-left-section';

    // Status Button (NFR007: Visual emoji button)
    const statusBtn = document.createElement('button');
    statusBtn.type = 'button';
    statusBtn.className = 'btn-action status-btn';
    // ✔️ representing true/completed status, ⚪ representing false/not completed status
    statusBtn.innerHTML = taskObj.done ? '✔️' : '⚪';
    statusBtn.setAttribute('aria-label', taskObj.done ? 'Mark task as incomplete' : 'Mark task as complete');
    
    // FR002: Click status button to toggle task's status
    statusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleTaskStatus(index);
    });

    // Task text display label
    const taskText = document.createElement('span');
    // NFR004: Completed task is bold (completed class), Pending is font-weight 500 (pending class)
    taskText.className = `task-text ${taskObj.done ? 'completed' : 'pending'}`;
    taskText.textContent = taskObj.task;

    // Double-click to start inline editing
    taskText.addEventListener('dblclick', () => {
      startEditing(li, index);
    });

    // Append standard elements to left section
    leftSection.appendChild(statusBtn);
    leftSection.appendChild(taskText);

    // Edit input box (inline editor)
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = taskObj.task;
    editInput.maxLength = 100;

    // Submit edit on Enter key, Cancel edit on Escape key
    editInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        saveEditedTask(index, editInput.value);
      } else if (e.key === 'Escape') {
        renderTasks(); // Cancel edit mode by re-rendering
      }
    });

    leftSection.appendChild(editInput);

    // Button group for standard state (Edit, Delete)
    const standardActions = document.createElement('div');
    standardActions.className = 'action-group standard-actions';

    // Edit task button
    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'btn-action edit-btn';
    editBtn.innerHTML = '✏️';
    editBtn.setAttribute('aria-label', 'Edit task');
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startEditing(li, index);
    });

    // FR003: Delete task button
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn-action delete-btn';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(index);
    });

    standardActions.appendChild(editBtn);
    standardActions.appendChild(deleteBtn);

    // Button group for active edit state (Save, Cancel)
    const editActions = document.createElement('div');
    editActions.className = 'action-group edit-actions';

    // Save button
    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.className = 'btn-action save-btn';
    saveBtn.innerHTML = '💾';
    saveBtn.setAttribute('aria-label', 'Save edited task');
    saveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      saveEditedTask(index, editInput.value);
    });

    // Cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'btn-action cancel-btn';
    cancelBtn.innerHTML = '❌';
    cancelBtn.setAttribute('aria-label', 'Cancel editing');
    cancelBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      renderTasks();
    });

    editActions.appendChild(saveBtn);
    editActions.appendChild(cancelBtn);

    // Assemble components into the task card
    li.appendChild(leftSection);
    li.appendChild(standardActions);
    li.appendChild(editActions);

    tasksList.appendChild(li);
  });
}

/**
 * Puts a task card into edit mode.
 */
function startEditing(cardElement, index) {
  // Reset other potential open edit boxes first
  renderTasks();

  // Find the re-rendered card and set editing class
  const activeCard = tasksList.querySelector(`[data-index="${index}"]`);
  if (activeCard) {
    activeCard.classList.add('editing');
    const input = activeCard.querySelector('.edit-input');
    input.focus();
    // Position cursor at the end of text
    const textVal = input.value;
    input.value = '';
    input.value = textVal;
  }
}

/**
 * Saves the edited task description.
 */
function saveEditedTask(index, newValue) {
  const trimmedValue = newValue.trim();
  if (trimmedValue === '') {
    alert('Task content cannot be empty.');
    return;
  }
  tasks[index].task = trimmedValue;
  saveTasks();
  renderTasks();
}

/**
 * FR002: Toggles the completion status ('done') of a task.
 */
function toggleTaskStatus(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

/**
 * FR003: Deletes a task from the list.
 */
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// FR001: Handle Adding a new task (done set to false by default)
addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({
      task: taskText,
      done: false // False by default as per FR001
    });
    saveTasks();
    taskInput.value = ''; // Reset input field
    renderTasks();

    // Smooth scroll wrapper to show the new card if overflowed
    const wrapper = document.querySelector('.tasks-wrapper');
    wrapper.scrollTo({
      top: wrapper.scrollHeight,
      behavior: 'smooth'
    });
  }
});

// Initial Render
renderTasks();
