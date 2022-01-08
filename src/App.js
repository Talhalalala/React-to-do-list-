import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

// Our todos assigned to a variable 
const LOCAL_STORAGE_KEY = 'todoApp.todos';




function App() {
  const [todos, setTodos] = useState([]);
  // allows us to reference the value in the input box 
  const todoNameRef = useRef();



  // This displays all the todos saved to local storage
  useEffect(() => {
    // retrieves all todos saved in local storage and assigns to variable 
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])




  // This saves the todo list to local storage every time the todos change 
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);


  // function allows us to toggle todos from complete to incomplete 
  function toggleTodo(id) {
    // creates a copy of the existing todos list 
    const newTodos = [...todos];
    // retrieves the todo that we want to modify 
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete ;
    // sets the todos list to the new modified todos list 
    setTodos(newTodos);
  }

  // removes all the completed to dos from the list 
  function handleClearTodos(e) {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    // assigning the current value inside the input box to a variable 
    const name = todoNameRef.current.value;
    // if the input box is empty return nothing 
    if (name === '') return 
    // just checking to see if we have access to the value 
    console.log(name);

    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    });

    // clears the value inside the input box after submitting a new value 
    todoNameRef.current.value = null;

    console.log(todos);
  }

  return (
    <>
      {/* pass toggleTodo function down so it can be used */}
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      {/* reference pointing to this input so we can access its value */}
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add to do</button>
      <button onClick={handleClearTodos}>Clear completed</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
