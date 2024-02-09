
const shoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

const basketUpdate = () =>{
    const cartAmount = document.getElementById("cartAmount");
    cartAmount.innerHTML = basket.map(item => item.product).reduce((x,y) => x+y, 0);
}
basketUpdate();
const generateCart = () =>{
    if(basket.length !== 0){
        basket.map(item =>{
            const {id, product} = item;
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
                                <div id="${id}" class="quantity">${product}</div>
                                <i onclick="increment(${id})" class="bi bi-plus"></i>
                            </div>
                        </div>
                        <h3>$ ${product * price}</h3>
                    </div>
            `
            shoppingCart.appendChild(cartDiv);
        })
    }
    else{
        console.log("shopping cart is empty");
    }
}

generateCart();
const increment = (selectedItem) =>{
    const search = basket.find(item => item.id === selectedItem);

    if(search === undefined){
        basket.push({
            id: selectedItem,
            product: 1
        })
    }
    else{
        search.product += 1;
    }
   // generateCart();
    update(selectedItem);
    localStorage.setItem("data",JSON.stringify(basket));
}

const decrement = (selectedItem) =>{
    const search = basket.find(item => item.id === selectedItem);

    if(search === undefined) return;
    else if(search.product === 0) return;
    else{
        search.product -= 1;
    }
    update(selectedItem);
    basket = basket.filter(item => item.product !== 0);
    generateCart()
    localStorage.setItem("data",JSON.stringify(basket));
}

const update = (itemId) =>{
    const quantity = document.getElementById(itemId);
    const search = basket.find(item => item.id === itemId);
    
    quantity.innerHTML = search.product;
    basketUpdate();
}


