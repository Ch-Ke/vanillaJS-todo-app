document.addEventListener("DOMContentLoaded", () =>{
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-button");
  const taskList = document.getElementById("task-list");
  const clearAllBtn = document.getElementById("clear-all-button");
  
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";
    tasks.forEach(task => {
      createTaskElement(task.text, task.completed);      
    });
  };

  addTaskBtn.addEventListener("click", () =>{
    const taskText = taskInput.value;
    if(taskText) {
      createTaskElement(taskText, false);
      saveTasks();
      taskInput.value = "";
    }
  });

  const createTaskElement = (text, completed) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", completed);
    li.innerHTML = `
      <span class="task-text">${text}</span>
      <button class="delete-button">Delete</button>
    `;
    li.addEventListener("click", () => toggleTaskCompletion(li));
    li.querySelector(".delete-button").addEventListener("click", (e) => {
      e.stopPropagation();      
      deleteTask(li);
    });
    taskList.appendChild(li);
  };

  const toggleTaskCompletion = (taskElement) => {
    taskElement.classList.toggle("completed");
    saveTasks();
  };

  const deleteTask = (taskElement) => {
    taskElement.remove();
    saveTasks();
  };

  clearAllBtn.addEventListener("click", () =>{
    taskList.innerHTML = "";
    saveTasks();
  });

  const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach(taskElement => {
      tasks.push({
        text: taskElement.querySelector(".task-text").textContent,
        completed: taskElement.classList.contains("completed")
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  loadTasks();
});
