const express = require('express')
const app = express();
const { connect, writeTodo, readAllTodos, updateTodo } = require('./db.js');

let clientGlobal;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/todos', async (req, res) => {
  console.log(req.body.todo);
  try {
    const result = await writeTodo(req.body.todo, clientGlobal);
    res.status(200).send(result);
  } catch(err) {
    res.status(500).send(err);
  }
})

app.get('/todos', async (req, res) => {
  try {
    const todos = await readAllTodos(clientGlobal);
    res.status(200).send(todos);
  } catch(err) {
    res.status(500).send(err);
  }
})

app.put('/todos', async (req, res) => {
  try {
    const todos = await updateTodo(req.body.id, req.body.text, clientGlobal);
    res.status(200).send(todos);
  } catch(err) {
    res.status(500).send(err);
  }
});

connect().then((client) => {
  clientGlobal = client;
  console.log('connection successful');
  app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
  });
})
