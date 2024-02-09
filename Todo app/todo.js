const addItems = () =>{
    const inputText = document.getElementById('input-field');
    const inputValue = inputText.value;

    if(inputValue === ''){
        alert("You must write something");
    }
    else{
        updateItems(inputValue);
    }
    inputText.value = '';
    saveItems();
}

const listContainer = document.getElementById('list-container');
const updateItems = (inputValue) =>{
    let li = document.createElement('li');
    li.innerText = inputValue;
    listContainer.appendChild(li);

    let span = document.createElement('span');
    span.innerHTML = "\u00d7";
    li.appendChild(span);
}

listContainer.addEventListener('click', function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle("checked");
        saveItems();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveItems();
    }
})

const saveItems = () =>{
    localStorage.setItem('data',listContainer.innerHTML);
}

const showItems = () =>{
    listContainer.innerHTML = localStorage.getItem("data");
}

showItems();