
const shoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

const chooseCart = () =>{
    if(basket.length !== 0){
        basket.map(product =>{
            const {id, item} = product;
            const search = carts.find(cart => cart.id === id) || [];
            const {img,name,price} = search;
            
            const cartDiv = document.createElement("div");
            cartDiv.classList.add("cart-div")
            cartDiv.innerHTML = `
                <img width=100 src="${img}">
                    <div class="cart-details">
                        <div class="cart-title"> 
                        <h4 class="cart-heading">
                            <p>${name}</p>
                            <p class="amount">$ ${price}</p>
                        </h4> 
                        <i class="bi bi-x-lg"></i>
                        </div>
                        <div class="cart-button"> 
                            <div class="buttons">
                                <i onclick="decrement(${id})" class="bi bi-dash"></i>
                                <div id="${id}" class="quantity">${item}</div>
                                <i onclick="increment(${id})" class="bi bi-plus"></i>
                            </div>
                        </div>
                        <h3>$ ${item * price}</h3>
                    </div>
            `
            shoppingCart.appendChild(cartDiv);
        })
    }
    else{
        console.log("empty");
    }

}

const increment = (id) =>{
    const search = basket.find(item => item.id === id);

    if(search === undefined){
        basket.push({
            id: id,
            item: 1
        })
    }
    else{
        search.item += 1;
    }
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
    basketUpdate()
}

const decrement = (id) =>{
    const search = basket.find(item => item.id === id);

    if(search.item === 0){
        shoppingCart.remove(cartDiv)
    }
    else{
        search.item -= 1;
    }
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
    basketUpdate();
}

const update = (id) =>{
    const search = basket.find(item => item.id === id);
    document.getElementById(id).innerHTML = search.item;
    basketUpdate();
}

const basketUpdate = () =>{
    const basketTotal = document.getElementById("cart-amount");
    basketTotal.innerHTML = basket.map(item => item.item).reduce((x,y) => (x+y),0);
}

basketUpdate(); 
chooseCart();