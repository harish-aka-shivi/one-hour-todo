const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'todoapp';

const collectionName = "todos";

const connectToMongo = () => {
  // Create a new MongoClient
  const client = new MongoClient(url);
  // Use connect method to connect to the Server
  return client.connect();
}

const writeTodo = (todo, client) => {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  return collection.insertOne(todo);
}

const readAllTodos = (client) => {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  return collection.find().toArray();
}

const updateTodo = (id, text, client) => {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  return collection.findOneAndUpdate({
    id: id
  }, {
    $set: {
      text: text,
    },
  });
}


exports.connect = connectToMongo;
exports.writeTodo = writeTodo;
exports.readAllTodos = readAllTodos;
exports.updateTodo = updateTodo;
