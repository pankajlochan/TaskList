// Define UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const fliter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Create Event Listeners
const loadEventListeners = () => {
  // DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);
  //  Add Task Event
  form.addEventListener("submit", addTask);
  // Remove Task Event
  taskList.addEventListener("click", removeTask);
  // Clear Task Event
  clearBtn.addEventListener("click", clearTasks);
  // Filter Task Event
  fliter.addEventListener("keyup", filterTasks);
};

// Get Tasks from Local Storage
const getTasks = () => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    // Create Li Element
    const li = document.createElement("li");
    // Add Class
    li.className = "collection-item";
    // Create text node & append li
    li.appendChild(document.createTextNode(task));

    // Create new Link Element
    const link = document.createElement("a");
    // Add Class
    link.className = "delete-item secondary-content";
    // Add Icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the Link to li
    li.appendChild(link);

    // Append the li to ul
    taskList.appendChild(li);
  });
};

// Add Task
const addTask = (e) => {
  if (taskInput.value === "") {
    alert("Please add a Task.");
  }

  // Create Li Element
  const li = document.createElement("li");
  // Add Class
  li.className = "collection-item";
  // Create text node & append li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create new Link Element
  const link = document.createElement("a");
  // Add Class
  link.className = "delete-item secondary-content";
  // Add Icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the Link to li
  li.appendChild(link);

  // Append the li to ul
  taskList.appendChild(li);

  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear Input
  taskInput.value = "";

  e.preventDefault();
};

// Store Task
const storeTaskInLocalStorage = (task) => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Remove Task
const removeTask = (e) => {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure ?")) {
      e.target.parentElement.parentElement.remove();

      // Remove Task from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
};

// Remove Task from Local Storage
const removeTaskFromLocalStorage = (taskItem) => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Clear Task
const clearTasks = () => {
  // if (confirm("Are You Sure, You want to Clear All Tasks ?")) {
  //   taskList.innerHTML = "";
  // }

  // Faster & using While Loop
  
  if (confirm("Are You Sure, You want to Clear All Tasks ?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }

  // Clear from Local Storage
  clearTasksFromLocalStorage();
};

// Clear Tasks from Localk Storage
const clearTasksFromLocalStorage = () => {
  localStorage.clear();
};

// Filter Tasks
const filterTasks = (e) => {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
};

// Load All Event Listeners
loadEventListeners();
