import React from 'react';

const TodoList = ({ todos, setTodos, status }) => {
  const [filtered, setFiltered] = React.useState([]);
  const [animate, setAnimate] = React.useState(0);

  // Renders again the todos filtering by status
  // Depends on todos array or status state changes
  React.useEffect(() => {
    switch (status) {
      case 'completed':
        setFiltered(todos.filter((todo) => todo.completed === true));
        break;
      case 'uncompleted':
        setFiltered(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFiltered(todos);
        break;
    }
  }, [todos, status]);

  // Deletes a todo from the list
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Set a todo as completed or uncompleted
  const completeTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  if (!todos) return null;
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filtered.map((todo, index) => (
          <div key={index} className="todo animateLeft">
            <li
              className={`todo-item ${todo.completed ? 'completed' : ''} `}
              key={todo.id}
            >
              {todo.text}
            </li>
            <button
              onClick={() => completeTodo(todo.id)}
              className="complete-btn"
            >
              <i className="fas fa-check" />
            </button>
            <button
              onClick={() => {deleteTodo(todo.id); setAnimate(1)}}
              onAnimationEnd={() => setAnimate(0)}
              className="trash-btn"
              animate={animate}
            >
              <i className="fas fa-trash" />
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
