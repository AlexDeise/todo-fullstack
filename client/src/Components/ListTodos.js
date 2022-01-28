import React, { useEffect, useState } from "react";

import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonDataReturned = await response.json();
      setTodos(jsonDataReturned);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);
  const deleteTodo = async (id) => {
    try {
      //fetch a delete request
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

    //   console.log(deleteTodo)

    setTodos(todos.filter(todo => todo.todo_id !== id)); //return only that dont match deleted todo ID
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="container">
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th scope="col">DB ID</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* {<tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>} */}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.todo_id}</td>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo}/>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodos;
