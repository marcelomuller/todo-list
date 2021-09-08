import React from 'react';
import TodoList from './TodoList';

const Form = () => {
  const [inputText, setInputText] = React.useState('');
  const [todos, setTodos] = React.useState([]);
  const [status, setStatus] = React.useState('all');
  const inputRef = React.useRef();
  const selectRef = React.useRef();

  // Get todos from local storage
  React.useEffect(() => {
    const localTodo = JSON.parse(localStorage.getItem('todos'));
    localTodo !== null && setTodos(localTodo);
  }, []);

  // Save todos to local storage
  React.useEffect(() => {
    todos !== null && localStorage.setItem('todos', JSON.stringify(todos));
  });

  // Set the focus to the input on load and after every change
  React.useEffect(() => {
    inputRef.current.focus();
  });

  // Set the input text to the input value
  const handleInputText = ({ target }) => {
    setInputText(target.value);
  };

  // Create a new todo, erase input field, change status
  // and select value to 'all'
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputText || /^\s*$/.test(inputText)) return;
    setTodos([
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        text: inputText,
        completed: false,
      },
    ]);
    setInputText('');
    setStatus('all');
    selectRef.current.value = 'all';
  };

  // Change the status state to the current select value
  const handleStatus = ({ target }) => {
    setStatus(target.value);
  };

  return (
    <div>
      <form>
        <input
          value={inputText}
          onChange={handleInputText}
          type="text"
          className="todo-input"
          ref={inputRef}
        />
        <button onClick={handleSubmit} className="todo-button">
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select
            onChange={handleStatus}
            name="todos"
            className="filter-todo"
            ref={selectRef}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>
      <TodoList todos={todos} setTodos={setTodos} status={status} />
    </div>
  );
};

export default Form;
