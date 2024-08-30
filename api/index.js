const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for todos (replace with a database in production)
let todos = [];

// Routes
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const newTodo = req.body.todo;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete('/api/todos/:id', (req, res) => {
  const index = parseInt(req.params.id);
  if (index >= 0 && index < todos.length) {
    const removedTodo = todos.splice(index, 1);
    res.json(removedTodo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
