const defaultTasks = [
  { task: "Go to the mall", done: true },
  { task: "Clean my house", done: false }
];

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

const tasksList = document.getElementById('tasks-list');
const addTaskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');

function saveTasks() {
  try {
    localStorage.setItem('task_do_it_tasks', JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks to local storage.", e);
  }
}

function renderTasks() {
  tasksList.innerHTML = '';

  if (tasks.length === 0) {
    const emptyState = document.createElement('li');
    emptyState.className = 'task-card empty-state-card';
    emptyState.innerHTML = '✨ No tasks left! Add a task to get started.';
    tasksList.appendChild(emptyState);
    return;
  }

  tasks.forEach((taskObj, index) => {
    const li = document.createElement('li');
    li.className = 'task-card';
    li.dataset.index = index;

    const leftSection = document.createElement('div');
    leftSection.className = 'task-left-section';

    const statusBtn = document.createElement('button');
    statusBtn.type = 'button';
    statusBtn.className = 'btn-action status-btn';
    statusBtn.innerHTML = taskObj.done ? '✔️' : '⚪';
    statusBtn.setAttribute('aria-label', taskObj.done ? 'Mark task as incomplete' : 'Mark task as complete');

    statusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleTaskStatus(index);
    });

    const taskText = document.createElement('span');
    taskText.className = `task-text ${taskObj.done ? 'completed' : 'pending'}`;
    taskText.textContent = taskObj.task;

    taskText.addEventListener('dblclick', () => {
      startEditing(li, index);
    });

    leftSection.appendChild(statusBtn);
    leftSection.appendChild(taskText);

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = taskObj.task;
    editInput.maxLength = 100;

    editInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        saveEditedTask(index, editInput.value);
      } else if (e.key === 'Escape') {
        renderTasks();
      }
    });

    leftSection.appendChild(editInput);

    const standardActions = document.createElement('div');
    standardActions.className = 'action-group standard-actions';

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'btn-action edit-btn';
    editBtn.innerHTML = '✏️';
    editBtn.setAttribute('aria-label', 'Edit task');
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startEditing(li, index);
    });

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

    const editActions = document.createElement('div');
    editActions.className = 'action-group edit-actions';

    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.className = 'btn-action save-btn';
    saveBtn.innerHTML = '💾';
    saveBtn.setAttribute('aria-label', 'Save edited task');
    saveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      saveEditedTask(index, editInput.value);
    });

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

    li.appendChild(leftSection);
    li.appendChild(standardActions);
    li.appendChild(editActions);

    tasksList.appendChild(li);
  });
}

function startEditing(cardElement, index) {
  renderTasks();

  const activeCard = tasksList.querySelector(`[data-index="${index}"]`);
  if (activeCard) {
    activeCard.classList.add('editing');
    const input = activeCard.querySelector('.edit-input');
    input.focus();
    const textVal = input.value;
    input.value = '';
    input.value = textVal;
    activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

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

function toggleTaskStatus(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({
      task: taskText,
      done: false 
    });
    saveTasks();
    taskInput.value = ''; 
    renderTasks();

    const wrapper = document.querySelector('.tasks-wrapper');
    wrapper.scrollTo({
      top: wrapper.scrollHeight,
      behavior: 'smooth'
    });
  }
});

renderTasks();
