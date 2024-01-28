document.addEventListener("DOMContentLoaded", function () {
    loadTodoList();
    document
      .getElementById("add-todo-addButton")
      .addEventListener("click", addTodo);
  });
  
  function addTodo() {
    var todoText = document.getElementById("new-todo").value;
    if (todoText.trim() === "") {
      alert("Podaj wartość!");
      return;
    }
  
    var todoList = document.getElementById("todo-list");
  
    var li = document.createElement("li");
    li.className = "todo-item";
  
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
      toggleTodoCompletion(li);
      saveTodoList();
    });
  
    var inputText = document.createElement("input");
    inputText.type = "text";
    inputText.value = todoText;
    inputText.addEventListener("input", function () {
      updateTodoText(li, inputText.value);
      saveTodoList();
    });
  
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Usuń";
    deleteButton.addEventListener("click", function () {
      deleteTodoItem(li);
      saveTodoList();
    });
  
    li.appendChild(checkbox);
    li.appendChild(inputText);
    li.appendChild(deleteButton);
  
    todoList.appendChild(li);
  
    saveTodoList();
  
    document.getElementById("new-todo").value = "";
  }
  
  function toggleTodoCompletion(todoItem) {
    todoItem.classList.toggle("completed");
  }
  
  function updateTodoText(todoItem, newText) {
    var checkbox = todoItem.querySelector('input[type="checkbox"]');
    if (!checkbox.checked) {
      var textInput = todoItem.querySelector('input[type="text"]');
      textInput.value = newText;
    }
  }
  
  function deleteTodoItem(todoItem) {
    todoItem.remove();
  }
  
  function saveTodoList() {
    var todoList = document.querySelectorAll("#todo-list > .todo-item");
    var todos = [];
  
    todoList.forEach(function (todoItem) {
      console.log(todoItem);
      var checkbox = todoItem.querySelector('input[type="checkbox"]');
      var textInput = todoItem.querySelector('input[type="text"]');
      var todo = {
        text: textInput.value,
        completed: checkbox.checked,
      };
      todos.push(todo);
    });
  
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  function loadTodoList() {
    var todoList = document.getElementById("todo-list");
    var todos = JSON.parse(localStorage.getItem("todos")) || [];
  
    todos.forEach(function (todo) {
      var li = document.createElement("li");
      li.className = "todo-item";
  
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", function () {
        toggleTodoCompletion(li);
        saveTodoList();
      });
  
      var inputText = document.createElement("input");
      inputText.type = "text";
      inputText.value = todo.text;
      inputText.addEventListener("input", function () {
        updateTodoText(li, inputText.value);
        saveTodoList();
      });
  
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        deleteTodoItem(li);
        saveTodoList();
      });
  
      li.appendChild(checkbox);
      li.appendChild(inputText);
      li.appendChild(deleteButton);
  
      todoList.appendChild(li);
    });
  }
  