
//get element by id
const form = document.getElementById("form");
const textInput = document.getElementById("text-input");
const dateInput = document.getElementById("date-input");
const textArea = document.getElementById("text-area");
const errorMgs = document.getElementById("error-mgs");
const tasksElement = document.getElementById("tasks");
const addButton = document.getElementById("add-btn");
const totalTask = document.getElementById("total-task");

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    getformValue()
})

//get form value from input
const getformValue = () =>{
    if(textInput.value === ''){
        errorMgs.innerHTML = "Task title can't be blank";
    }
    else{
        errorMgs.innerHTML = '';
        createForm();
        taskCountIncrease();
        removeModal();
    }
}

//task count
const taskCount = () =>{
    const taskItem = totalTask.innerText;
    const taskNumber = parseInt(taskItem);
    return taskNumber;
}

// task count increase
const taskCountIncrease = () =>{
    const taskNumber = taskCount();
    let totalTaskItem = taskNumber + 1;
    totalTask.innerText = totalTaskItem;
}

//task count decrease
const taskCountDecrease = () =>{
    const taskNumber = taskCount();
    let totalTaskItem = taskNumber - 1;
    totalTask.innerText = totalTaskItem;
}

//task count not changed if task update
const taskCountEuqal = () =>{
    const previousValue = taskCount();
    let currentValue = previousValue - 1;
    totalTask.innerText = currentValue;
}

//remove modal when add or close button clicked
const removeModal = () =>{
    addButton.setAttribute("data-bs-dismiss", "modal");
    addButton.click();

    (() =>{
        addButton.setAttribute("data-bs-dismiss", "");
    })();
}

//set value in a object
let data = [{}];

const createForm = () =>{
    data.push({
        text : textInput.value,
        date : dateInput.value,
        description : textArea.value
    })

    localStorage.setItem("data",JSON.stringify(data));
    createTask()
}

//create new task
const createTask = () =>{
    tasksElement.innerHTML = "";
    data.map((x, y) =>{
        return (tasksElement.innerHTML += `
        <div id="${y}">
            <span>${x.text}</span>
            <span class="date small mb-2">${x.date}</span>
            <p>${x.description}</p>

            <span class="options">
                <i data-bs-toggle="modal" data-bs-target="#form" onclick="editTask(this)" class="fa-regular fa-pen-to-square"></i>
                <i onclick="deleteTask(this)" class="fa-solid fa-trash-can"></i>
            </span>
        </div>
    `)

    })
    inputValue();
}

//input field none
const inputValue = () =>{
    textInput.value = '';
    dateInput.value = '';
    textArea.value = ''; 
}

//delete task when delete button clicked
const deleteTask = (e) =>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));

    taskCountDecrease();
}

//edit task when edit button clicked
const editTask = (e) =>{
   const selectedElement = e.parentElement.parentElement;

   textInput.value = selectedElement.children[0].innerHTML;
   dateInput.value = selectedElement.children[1].innerHTML;
   textArea.value = selectedElement.children[2].innerHTML;

   //selectedElement.remove();
   deleteTask(e);
   taskCountEuqal();
}

(() =>{
    data = JSON.parse(localStorage.getItem(data)) || [];
    createTask();
})()