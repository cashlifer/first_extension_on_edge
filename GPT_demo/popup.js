// 处理ToDo list的逻辑
document.addEventListener('DOMContentLoaded', function () {
    const todoInput = document.getElementById('new-todo');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
  
    // 从存储中获取todos
    chrome.storage.sync.get(['todos'], function (result) {
      const todos = result.todos || [];
      todos.forEach(todo => {
        addTodoToList(todo);
      });
    });
  
    // 添加todo
    addTodoButton.addEventListener('click', function () {
      const newTodo = todoInput.value;
      if (newTodo) {
        addTodoToList(newTodo);
        saveTodoToStorage(newTodo);
        todoInput.value = '';
      }
    });
  
    // 将todo添加到列表
    function addTodoToList(todo) {
      const li = document.createElement('li');
      li.textContent = todo;
      todoList.appendChild(li);
    }
  
    // 保存todo到存储
    function saveTodoToStorage(todo) {
      chrome.storage.sync.get(['todos'], function (result) {
        const todos = result.todos || [];
        todos.push(todo);
        chrome.storage.sync.set({ todos: todos });
      });
    }
  });
  