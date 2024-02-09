
const addItems = () =>{
    const inputText = document.getElementById('input-field');
    const inputValue = inputText.value;
    inputText.value = '';
    if(inputValue === ''){
        alert('You must write something!!');
    }
    else{
        displayItems(inputValue);
    }
}

const ul = document.getElementById('list');
const displayItems = (inputValue) =>{
    
    const li = document.createElement('li');
    const icon = document.createElement('i');
    
    //add class and inner text
    li.innerText = inputValue;
    li.classList.add('list-item');
    icon.classList.add('fa-solid', 'fa-xmark', 'icon');
    
    li.appendChild(icon);
    ul.appendChild(li);
    saveItemsToLS();
}

ul.addEventListener('click', function(e){
    if(e.target.tagName === 'I'){
        e.target.parentElement.remove();
        saveItemsToLS();
    }
})

//add to localStroage
const saveItemsToLS = () =>{
    localStorage.setItem('item', ul.innerHTML);
}

const getItemsToLS = () =>{
    ul.innerHTML = localStorage.getItem('item');
}
getItemsToLS();