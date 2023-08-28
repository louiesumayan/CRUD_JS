window.addEventListener('load', () => {
  // getting item in localstorage
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  const nameInput = document.querySelector('#name');
  const newTodoForm = document.querySelector('#new-todo-form');

  const username = localStorage.getItem('username') || '';
  nameInput.value = username;

  //set the username
  nameInput.addEventListener('change', (e) => {
    localStorage.setItem('username', e.target.value);
  });

  // save the data if click submit
  newTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //creating a object of todo
    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: [
        new Date().getMonth() + 1,
        new Date().getDate(),
        new Date().getFullYear(),
      ],
    };

    //pushing the todo and saving it in localstorage
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    e.target.reset();
    DisplayTodos();
  });
  DisplayTodos();
});

// displaying todo
function DisplayTodos() {
  const todoList = document.querySelector('#todo-list');

  todoList.innerHTML = '';

  //looping in item todos (line 3)
  todos.forEach((todo) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    // creating new element
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const content = document.createElement('div');
    const actions = document.createElement('div');
    const edit = document.createElement('button');
    const deleteButton = document.createElement('button');

    input.type = 'checkbox';
    input.checked = todo.done;
    span.classList.add('bubble');

    if (todo.category == 'personal') {
      span.classList.add('personal');
    } else {
      span.classList.add('business');
    }

    content.classList.add('todo-content');
    actions.classList.add('actions');
    edit.classList.add('edit');
    deleteButton.classList.add('delete');

    //displaying content from todo object in line (20)
    content.innerHTML = `<input type='text' value="${todo.content}" readonly>`;

    edit.innerHTML = 'Edit';
    deleteButton.innerHTML = 'Delete';

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add('done');
    }
    input.addEventListener('click', (e) => {
      todo.done = e.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add('done');
      } else {
        todoItem.classList.remove('done');
      }
      DisplayTodos();
    });

    //function for editing todos element
    edit.addEventListener('click', (e) => {
      const input = content.querySelector('input');
      input.removeAttribute('readonly');
      input.focus();
      input.addEventListener('blur', (e) => {
        input.setAttribute('readonly', true);
        todo.content = e.target.value;
        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodos();
      });
    });

    //function for delete a element
    deleteButton.addEventListener('click', (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem('todos', JSON.stringify(todos));
      DisplayTodos();
    });
  });
}
