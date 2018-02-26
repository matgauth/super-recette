//Model
const TodoModel = localStorageKey => {
  let todos = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  return {
    getTodos: () => todos,
    addTodo: text => {
      let id = todos.length;
      todos = [...todos, { id, text }];
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
      return id;
    },
    removeTodo: id => {
      todos = todos.filter(todo => todo.id !== id);
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  };
};
//View
document.addEventListener('DOMContentLoaded', event => {
  let form = document.querySelector('form');
  let list = document.querySelector('ul');
  let exp = document.querySelector('#export');

  const renderTasks = (id, text) => {
    let taskItem = document.createElement('li');
    let taskText = document.createElement('span');
    let taskBtn = document.createElement('button');

    taskItem.appendChild(taskText);
    taskText.textContent = text;
    taskItem.appendChild(taskBtn);
    taskBtn.textContent = 'Delete';

    taskBtn.onclick = e => {
      list.removeChild(taskItem);
      tasks.removeTodo(id);
    };

    list.appendChild(taskItem);
  };

  let tasks = TodoModel();
  tasks.getTodos().map(task => renderTasks(task.id, task.text));

  form.addEventListener('submit', event => {
    event.preventDefault();
    const taskText = form.elements.text.value || 'Nouvelle tâche';
    let taskId = tasks.addTodo(taskText);
    renderTasks(taskId, taskText);
    form.elements.text.value = '';
  });

  exp.addEventListener('click', e => {
    var pdf = new jsPDF();

    pdf.setFontSize(22);
    pdf.setFontType('bold');
    pdf.text('Vos tâches', 30, 40);

    pdf.setFontSize(14);
    pdf.setFontType('normal');

    tasks
      .getTasks()
      .map((item, i) => pdf.text(`${i + 1}. ${item.text}`, 30, 50 + i * 10));

    pdf.save('tasks.pdf');
  });
});
