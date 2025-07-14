const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Load saved tasks
window.onload = () => {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => addTodo(todo.text, todo.completed));
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const task = input.value.trim();
  if (task) {
    addTodo(task);
    input.value = '';
  }
});

function addTodo(task, completed = false) {
  const li = document.createElement('li');
  li.textContent = task;

  if (completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTodos();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = '✖';
  delBtn.addEventListener('click', () => {
    li.remove();
    saveTodos();
  });

  li.appendChild(delBtn);
  list.appendChild(li);
  saveTodos();
}

function saveTodos() {
  const todos = [];
  document.querySelectorAll('#todo-list li').forEach(li => {
    todos.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}
