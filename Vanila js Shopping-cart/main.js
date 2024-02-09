
const generateCart = () =>{
    const shoppingCart = document.getElementById("shop-cart");

    carts.forEach(cart =>{
        const {id,img,name,description,price} = cart;
        const search = basket.find(item => item.id === id) || [];

        const cartDelails = document.createElement("div");
        cartDelails.classList.add("details");
        cartDelails.innerHTML = `
        <img src="${img}" alt="">
        <div class="cart-body">
            <h3>${name}</h3>
            <p>${description}</p>

            <div class="price">
            <h3>$ ${price}</h3>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash"></i>
                    <div id="${id}" class="quantity">${search.item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus"></i>
                </div>
            </div>
        </div>
        `
        shoppingCart.appendChild(cartDelails); 
    })
}

let basket = JSON.parse(localStorage.getItem("data")) || [];
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
        return
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
}

const basketUpdate = () =>{
    const basketTotal = document.getElementById("cart-amount");
    basketTotal.innerHTML = basket.map(item => item.item).reduce((x,y) => (x+y),0);
}

basketUpdate();
generateCart();