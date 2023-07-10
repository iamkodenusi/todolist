//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event){
    event.preventDefault();
    //Prevents form from submitting and refreshing the page.
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Creates TOdo DIV
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);
    //Creates LI and appends it to TodoDIV
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK-MARK BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //TRASH BUTTON
    todoList.appendChild(todoDiv);
    //APPEND TO LIST
    todoInput.value = "";
    //Clears the Todo Input value to make the form look neater and more functional as the user can simply add a new task immediately.
}

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add("fall"); //This is the animation for the deletion.
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){ //This event listener will wait until the delete animation completes before actually deleting the item from the console log.
        todo.remove();
        })
        
    }
    //This function deletes the list items from the list. Usable for when a  user makes an error or nolonger needs an item they have placed on their list.

if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle('completed');
    }
}
//This function enables the completed button.

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
    switch(e.target.value){
        case "all":
            todo.style.display = "flex";
            break;
        case "completed":
            if(todo.classList.contains('completed')){
                todo.style.display = "flex"; /* Display "flex" was used because that is what we used in our style.css. It makes it easier to filter out completed tasks as needed for usablity.*/
            }else{
                todo.style.display = "none";
            }
            break;
            case "uncompleted":
            if(!todo.classList.contains('completed')){
                todo.style.display = "flex";  
            }else{
                todo.style.display = "none";
            }
            break;
    }
    });
}


function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    //This function will check for already saved todos
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Creates TOdo DIV
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Creates LI and appends it to TodoDIV
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //CHECK-MARK BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //TRASH BUTTON
        todoList.appendChild(todoDiv);
        //APPEND TO LIST
    })

    }

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todo.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    //This function allows for the deletion of a todo from the local storage. It was a hard issue to solve as the delete button only interacted with the div until this new function was added.
    //It was especially difficult to decide how to call this function without breaking or deleting todos that were still needed.
    //To do it, I utilised the following data example from the console log
    //cont todos = ["sugar", "bread", "milk", "diapers"];
    //console.log(todos.indexOf("bread"));
    //Which gave me "1" as a position. I was then able to use this to call for which items from the local storage would need to be deleted, without affecting the rest of the list.
    //That is, using the Splice method to solve the problem of identifying the right todo entries to delete.
}