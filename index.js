const express = require("express");
const cors = require("cors");

console.log('we');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3333;

const todos = [];

// 1
app.get("/", (req, res) => {
  res.send("Ok, działa!");
});

// 2
app.get("/todos", (req, res) => {
  res.json({ todos });
});

app.post("/todo", (req, res) => {
  const todo = req.body;
  todos.push(todo);
  return res.status(200).end();
});

app.patch("/todo/:todoId", (req, res) => {
  const foundTodo = todos.find(
    (todo) => todo.id === parseInt(req.params.todoId, 10)
  );

  if (!foundTodo) {
    res.status(401).end();
  } else {
    const todoIndex = todos.findIndex((todo) => todo === foundTodo);

    Object.entries(req.body).forEach(([key, value]) => {
      todos[todoIndex][key] = value;
    });

    return res.status(200).end();
  }
});

app.delete("/todo/:todoId", (req, res) => {
  const foundTodo = todos.find(
    (todo) => todo.id === parseInt(req.params.todoId, 10)
  );

  if (!foundTodo) {
    res.status(401).end();
  } else {
    const todoIndex = todos.findIndex((todo) => todo === foundTodo);
    todos.splice(todoIndex, 1);

    return res.json(todos);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
