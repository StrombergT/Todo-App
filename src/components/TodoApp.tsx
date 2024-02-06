import { useState } from "react";

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
      <div className="max-w-2xl mx-auto  mt-10 bg-gradient-to-r from-green-300 to-blue-300 shadow-md rounded p-8">
        <h1 className="text-center text-3xl text-blue-700 mb-4 font-bold">
          Todo App!
        </h1>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="w-4/5 px-4 py-2 mr-4 text-base border border-blue-300 rounded-full focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-full cursor-pointer text-base transition duration-300 hover:bg-blue-600 mt-4 mx-auto place-items-center focus:outline-none"
        >
          Add Todo
        </button>
        <ul className="list-none">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between border-b border-blue-500 py-4 "
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="mr-4"
              />
              <span
                className={todo.completed ? "line-through text-gray-600" : ""}
              >
                {todo.text} - Created at: {todo.createdAt.toLocaleString()}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-red-600 focus:outline-none"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="max-w-2xl mx-auto  mt-10 bg-gradient-to-r from-blue-300 to-green-300 shadow-md rounded p-8">
        <h2 className="text-2xl text-green-700 mb-4 font-bold text-center">
          Completed Todo
        </h2>
        <ul className="list-none">
          {completedTodos.map((todo) => (
            <li
              key={todo.id}
              className="line-through text-gray-600 text-center"
            >
              {todo.text} - Created at: {todo.createdAt.toLocaleString()};
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoApp;
