import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';


function TodoItem({todo, deleteTodo, editTodo}) {

  const [editableText, setEditableText] = useState(todo.text);

  const [isEditable, setIsEditable] = useState(false)

  const handleChange = event => {
    if(event.target.value) {
      setEditableText(event.target.value);
    }
  }

  const editTodoInternal = () => {
    setIsEditable(false);
    editTodo(editableText, todo);
  } 

  const textDisplayElement = !isEditable ? 
    <p>{todo.text}</p> :
    <input value={editableText} onChange={handleChange}></input>

  const editDoneButton = !isEditable ? 
    <button onClick={() => setIsEditable(true)}>Edit</button> : 
    <button onClick={() => editTodoInternal()}>Done</button>

  return (
    <div className="todo-item-root">
      {textDisplayElement}
      <button onClick={() => deleteTodo(todo)}>Delete</button>
      {editDoneButton}
    </div>
  )
}

function App() {

  const [todos, setTodos] = useState([]);

  const [inputText, setInputText] = useState('');

  const addTodo = (todo) => {
    const newTodos = todos.concat(todo);
    setTodos(newTodos);
  } 

  const deleteTodo = (todo) => {
    const newTodos = todos.filter(item => item.id !== todo.id);
    setTodos(newTodos);
  }

  const handleClick = (event) => {
    if(inputText) {
      addTodo({
        text: inputText,
        id: Date.now().toString(),
      })
    }
  }

  const editTodo = (newText, todo) => {
    let indexOfTodoToEdit = 0;
    todos.forEach((item, index) => {
      if(todo.id === item.id) {
        indexOfTodoToEdit = index; 
      }
    });

    const todoToEdit = todos[indexOfTodoToEdit];
    const newTodo = {...todoToEdit, text: newText};
    const newTodos = todos.map(item => {
      if (item.id === todoToEdit.id) {
        return newTodo;
      } else {
        return item;
      }
    })
    setTodos(newTodos);
  }

  const handleChange = event => {
    if(event.target.value) {
      setInputText(event.target.value);
    }
  }

  return (
    <div>
      <div className="inputContainer">
      <label>What you want to do?
      <input value={inputText} onChange={handleChange}></input>
      </label>
      <button type="button" onClick={handleClick}>Submit</button>
      </div>

      <div className="toDoContainer">
        {
          todos.map((item, index) => {
            return (
              <TodoItem key={item.id} editTodo={editTodo} todo={item} deleteTodo={deleteTodo}></TodoItem>
            )
          })
        }
      </div>

    </div>
  );
}

export default App;
