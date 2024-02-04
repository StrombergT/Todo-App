import { useState } from "react";
import "./TodoApp.css";

interface TodoItem {
  id: string;
  text: string;
  completed?: boolean;
  createdAt: Date;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [completedTodos, setCompletedTodos] = useState<TodoItem[]>([]);

  const addTodo = () => {
    if (newTodo !== "") {
      const newId = crypto.randomUUID();
      const newTodoItem: TodoItem = {
        id: newId,
        text: newTodo,
        completed: false,
        createdAt: new Date(),
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id: string) => {
    const updateTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodos);

    const completedTodo = todos.find((todo) => todo.id === id);
    if (completedTodo) {
      setCompletedTodos([...completedTodos, completedTodo!]);
    }
  };

  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <div className="todo-container">
        <h1 className="todo-header">Todo App!</h1>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="todo-input"
        />
        <button onClick={addTodo} className="add-button">
          Add Todo
        </button>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <span className={todo.completed ? "completed" : ""}>
                {todo.text} - Created at: {todo.createdAt.toLocaleString()}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="completed-todo">Completed Todo</h2>
        <ul className="todo-list">
          {completedTodos.map((todo) => (
            <li key={todo.id} className="todo-item-completed">
              {todo.text} - Created at: {todo.createdAt.toLocaleString()};
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoApp;
