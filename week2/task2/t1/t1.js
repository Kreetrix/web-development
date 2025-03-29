// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];
// add your code here

const ul = document.querySelector('ul');
const dialog = document.querySelector('dialog');
const addBtn = document.querySelector('.add-btn');
const form = document.querySelector('form');

function renderTodoList() {
  ul.innerHTML = '';
  
  todoList.forEach(item => {
    const li = document.createElement('li');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `todo-${item.id}`;
    checkbox.checked = item.completed;
    
    const label = document.createElement('label');
    label.htmlFor = `todo-${item.id}`;
    label.textContent = item.task;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
    
    checkbox.addEventListener('change', () => {
      item.completed = checkbox.checked;
      console.log('Updated todoList:', todoList);
      
      if (checkbox.checked) {
        label.style.backgroundColor = '#90fc03';
        label.style.fontWeight = 'bold';
      } else {
        label.style.backgroundColor = '';
        label.style.fontWeight = '';
      }
    });
    
    deleteBtn.addEventListener('click', () => {
      const index = todoList.findIndex(todo => todo.id === item.id);
      if (index !== -1) {
        todoList.splice(index, 1);
        ul.removeChild(li);
        console.log('Updated todoList:', todoList);
      }
    });
  });
}

addBtn.addEventListener('click', () => {
  dialog.showModal();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = form.querySelector('input');
  const task = input.value.trim();
  
  if (task) {
    const newId = todoList.length > 0 ? Math.max(...todoList.map(item => item.id)) + 1 : 1;
    const newItem = {
      id: newId,
      task: task,
      completed: false
    };
    
    todoList.push(newItem);
    renderTodoList();
    console.log('Updated todoList:', todoList);
    
    input.value = '';
    dialog.close();
  }
});

renderTodoList();