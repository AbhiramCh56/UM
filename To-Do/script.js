document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  loadTasks();

  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodoItem(todoInput.value);
    todoInput.value = "";
    saveTasks();
  });

  function addTodoItem(task, completed = false) {
    const listItem = document.createElement("li");
    if (completed) listItem.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = completed;
    checkbox.addEventListener("change", () => {
      listItem.classList.toggle("completed");
      saveTasks();
    });

    const taskText = document.createElement("span");
    taskText.textContent = task;
    taskText.classList.add("task-text");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    editButton.addEventListener("click", () => {
      editTodoItem(taskText);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      listItem.remove();
      saveTasks();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    todoList.appendChild(listItem);
  }

  function editTodoItem(taskText) {
    const newTask = prompt("Edit your task", taskText.textContent);
    if (newTask !== null && newTask.trim() !== "") {
      taskText.textContent = newTask.trim();
      saveTasks();
    }
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach((listItem) => {
      const taskText = listItem.querySelector(".task-text").textContent;
      const completed = listItem.classList.contains("completed");
      tasks.push({ task: taskText, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => addTodoItem(task.task, task.completed));
  }
});
