const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create todo
app.post("/todos", async (request, response) => {
  try {
    // console.log(request.body);
    const { description } = request.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    response.json(newTodo.rows[0]);
    console.log("Inserted new task description (row) to table");
  } catch (e) {
    console.error(e.message);
  }
});

//get all todo
app.get("/todos", async (request, response) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    response.json(allTodos.rows);
  } catch (e) {
    console.error(e.message);
  }
});

//get single todo
app.get("/todos/:id", async (request, response) => {
  try {
    // console.log(request.params)
    const { id } = request.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);

    response.json(todo.rows[0]);
  } catch (e) {
    console.error(e.message);
  }
});

//update a todo
app.put("/todos/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { description } = request.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    response.json("UPDATED TODO LIST");
  } catch (e) {
    console.error(e.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const todoToBeDeleted = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );
    response.json("TODO deleted");
  } catch (e) {
    console.error(e.message);
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
