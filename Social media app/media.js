
const form = document.getElementById("form");
const textField = document.getElementById("text-field");
const errroMgs = document.getElementById("error-mgs");
const post = document.getElementById("posts");

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    formValidation();
});

const formValidation = () =>{
    if(textField.value === ''){
        errroMgs.innerText = "Post can't be blank";
    }
    else{
        createPost(textField.value);
    }
}

const createPost = (postText) =>{
    post.innerHTML += `
        <div>
            <p>${postText}</p>
            <span class="icon">
                <i onclick="editPost(this)" class="fa-solid fa-user-pen"></i>
                <i onclick="deletePost(this)" class="fa-solid fa-trash"></i>
            </span>
        </div>    
    `
    textField.value = "";
}

const deletePost = (e) =>{
    e.parentElement.parentElement.remove();
}

const editPost = (e) =>{
    textField.value = e.parentElement.previousElementSibling.innerHTML;
    e.parentElement.parentElement.remove();
}
