// selectors
let todo_input=document.querySelector('.todo-input');
let todo_button=document.querySelector('.todo-button');
let todo_list=document.querySelector('.todo-list');
let filterOptions=document.querySelector('.filter-todo');


// Event Function
const addItem=(event)=>{
//prevent submit default event thatis type=submit
event.preventDefault();

//create todo div
let todo=document.createElement('div');
todo.classList.add('todo');

// create todo list and add value from todo-input
let list=document.createElement('li');
todo.classList.add('list');
list.innerText=todo_input.value;
// Add To Local Storage
saveToLocalStorage(todo_input.value,false);

//create todo check button and add icon also
let check=document.createElement('button');
check.classList.add('check');
check.innerHTML='<i class="fa fa-check"></i>';

//create todo delete button add icon also
let del=document.createElement('button');
del.classList.add('delete');
del.innerHTML='<i class="fa fa-trash"></i>';


/* append list , check and delete button to todo div */
todo.appendChild(list);
todo.appendChild(check);
todo.appendChild(del);

/*
Now you have the div like
<div class='todo'>
<li class='list'></li>
<button class='check fa fa-check'></button>
<button class='delete fa fa-trash'></button>
</div> 
*/

// append above todo into todo-list
todo_list.appendChild(todo);

// Once the item added succesfully clear todo-input
todo_input.value='';

}

const deleteComplete=(event)=>{
    let target=event.target;
    if(target.classList[0]==='delete')
    {
    let todoItem=target.parentElement;   
    deleteFromLocalStorage(todoItem);
    todoItem.classList.add('fall');
     todoItem.addEventListener('transitionend',()=>{
         todoItem.remove()}); 
    
    }
    if(target.classList[0]==='check')
    {   
        let todoItem=target.parentElement;   
        todoItem.classList.toggle('completed');
        todoItem.addEventListener('transitionend',()=>{
          toggleCheckedLocalStorageItem(todoItem); 
        }); 
     
    }
  

}


const filterToDo=(event)=>{
const todos=todo_list.childNodes;
todos.forEach(todo=>{
switch(event.target.value)
{
    case 'all':
        todo.style.display='flex';
    break;
    case 'completed':
        if(todo.classList.contains('completed'))
        {
            todo.style.display='flex';
        }   
        else
        {
            todo.style.display='none';
        } 
    break;
    case 'uncompleted':
        if(!todo.classList.contains('completed'))
        {
            todo.style.display='flex';
        }   
        else
        {
            todo.style.display='none';
        } 
    break;       
}

});

}




// Save To Local storage
const  saveToLocalStorage=(todo,completed)=>{
let todos;
// checck todos is defined or not
if(localStorage.getItem("todos")===null)
{
    todos=[]
}
else
{
    todos=JSON.parse(localStorage.getItem("todos"));
}

todos.push({value:todo,completed:completed});
localStorage.setItem('todos',JSON.stringify(todos));
}




// Get Items From The LocalStorage
const getItems=()=>{

    let todos;
// checck todos is defined or not
if(localStorage.getItem("todos")===null)
{
    todos=[]
}
else
{
    todos=JSON.parse(localStorage.getItem("todos"));
}

// Putting Items into todo_list
todos.forEach(object=>{

//create todo div
let todo=document.createElement('div');
todo.classList.add('todo');

if(object.completed)
{
    todo.classList.add('completed');
}


// create todo list and add value from todo-input
let list=document.createElement('li');
todo.classList.add('list');
list.innerText=object.value;

//create todo check button and add icon also
let check=document.createElement('button');
check.classList.add('check');
check.innerHTML='<i class="fa fa-check"></i>';

//create todo delete button add icon also
let del=document.createElement('button');
del.classList.add('delete');
del.innerHTML='<i class="fa fa-trash"></i>';


/* append list , check and delete button to todo div */
todo.appendChild(list);
todo.appendChild(check);
todo.appendChild(del);
todo_list.appendChild(todo);
});
}


//Register Add Item Event Listener
todo_button.addEventListener('click',addItem);

//Rgister DeleteComplete Event Listener On ToDo List
todo_list.addEventListener('click',deleteComplete);

//Register Filter Event Listener
filterOptions.addEventListener('click',filterToDo);

// check Items is available on local storage or not
document.addEventListener('DOMContentLoaded',getItems);



//delete From LocalStorage

const  deleteFromLocalStorage=(todoDiv)=>{
    let todos;
    // checck todos is defined or not
    if(localStorage.getItem("todos")===null)
    {
        todos=[]
    }
    else
    {
        todos=JSON.parse(localStorage.getItem("todos"));
    }

   const todoCompnent=todoDiv.children;
   const todo = todoCompnent[0].innerText;
   todos=todos.filter(obj=>obj.value!=todo)
  localStorage.setItem('todos',JSON.stringify(todos));
}
    
// checked completed LocalStorage Item
const  toggleCheckedLocalStorageItem=(todoDiv)=>{

    let todos;
    // checck todos is defined or not
    if(localStorage.getItem("todos")===null)
    {
        todos=[]
    }
    else
    {
        todos=JSON.parse(localStorage.getItem("todos"));
    }
   
    if(todoDiv.classList.contains('completed'))
    {
        const todoCompnent=todoDiv.children;
        const todo = todoCompnent[0].innerText;
        
        todos=todos.map(obj=>{
        if(obj.value===todo)
        obj.completed=true;
        else
        obj.copmleted=false;

        return obj;
        });

       localStorage.setItem('todos',JSON.stringify(todos));
    }
    else 
    {
        const todoCompnent=todoDiv.children;
        const todo = todoCompnent[0].innerText;

        todos=todos.map(obj=>{
            if(obj.value===todo)
            obj.completed=false;
            else
              obj.copmleted=true;

            return obj;  
            });
        
       localStorage.setItem('todos',JSON.stringify(todos));
    }


}    