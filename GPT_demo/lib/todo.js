$(document).ready(function () {
    const $todoInput = $('#new-todo');
    const $addTodoButton = $('#add-todo');
    const $todoList = $('#todo-list');
  
    // 从存储中获取todos并显示
    chrome.storage.sync.get(['todos'], function (result) {
      const todos = result.todos || [];
      todos.forEach(todo => {
        addTodoToList(todo);
      });
    });
  
    // 添加新todo
    $addTodoButton.on('click', function () {
      const newTodo = $todoInput.val();
      if (newTodo) {
        addTodoToList(newTodo);
        saveTodoToStorage(newTodo);
        $todoInput.val('');
      }
    });
  
    // 将todo添加到列表中
    function addTodoToList(todo) {
      const $li = $('<li>').text(todo);
      $li.on('click', function () {
        $li.toggleClass('completed');
      });
      $todoList.append($li);
    }
  
    // 保存todo到存储中
    function saveTodoToStorage(todo) {
      chrome.storage.sync.get(['todos'], function (result) {
        const todos = result.todos || [];
        todos.push(todo);
        chrome.storage.sync.set({ todos: todos });
      });
    }
  });
  