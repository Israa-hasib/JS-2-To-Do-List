const todoList = document.getElementById("todoList");
const listItem = document.createElement("li");
const submitBtn = document.querySelector("#addtodo");
const todoInput = document.querySelector("#todoInput")
const clearText = document.querySelector('.todoInput');
const errorMessage = document.querySelector("#errorMessage")
const toDoArray= []
const id = toDoArray.length +1
let BASE_URL = "https://jsonplaceholder.typicode.com/todos/";

// Fetch hämta todos
  window.onload = function() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => response.json())
      .then(todos => {
        // Hämta elementet
        const todoList = document.getElementById("todoList");
        todos.forEach(todo => {
          toDoArray.push(todo)
        })
        console.log(toDoArray)

        // Lägg till todos
        for (let i = 0; i < todos.length; i++) {
          let todo = todos[i];
          let listItem = document.createElement("li");
          listItem.innerText = todo.title;
          listItem.setAttribute("data-id", todo.id);
          listItem.innerHTML += ' <button onclick="removeTodo(this)">Ta bort</button>';
          todoList.appendChild(listItem);
       }
    });
  }
  
// Ta bort todo
  function removeTodo(element) {
    const todoId = element.parentNode.getAttribute("data-id");
    fetch(BASE_URL + todoId, {
      method: 'DELETE'
      
    }).then(response => {
        if (response.ok) {
          console.log(response)
          const index = toDoArray.indexOf(todoId => todoId == index)
          toDoArray.splice(index, 1)

            element.parentNode.remove();
        }
        else {
          console.log("Fetch failed")
        }
    });
  }

  // validering ingen tom todo
  function addTodo(e) {
    e.preventDefault()
    const todoInput = document.getElementById("todoInput").value;
    if (todoInput.trim() === "") {
      errorMessage.classList.remove('d-none');
      return
    // } else {  
    }
    errorMessage.classList.add('d-none');

  // Skicka till databas
      const newTodo = {
        userId: 11,
        title: todoInput,
        completed: false,
    }

  // Lägg till
    let listItem = document.createElement("li");
    listItem.innerText = todoInput;
    // listItem.setAttribute("data-id", todo.id);
    listItem.innerHTML += ' <button onclick="removeTodo(this)">Ta bort</button>';
    todoList.appendChild(listItem);

  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => {
    toDoArray.push(json)
    console.log(toDoArray)
    console.log(json)
    console.log("clear text")
    clearText.value = "";
  })
}
  submitBtn.addEventListener('click', addTodo)