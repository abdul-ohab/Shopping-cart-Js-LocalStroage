
let basket = JSON.parse(localStorage.getItem("data")) || [];

const createCart = () => {
    const cartContainer = document.getElementById("shop-cart");
    carts.map(cart => {
        let { id, img, name, description, price } = cart;
        const search = basket.find(item => item.id === id) || [];
        const details = document.createElement("div");
        details.classList.add('details');

        details.innerHTML = `
        <div class="details" id="product-id-${id}">
            <img src="${img}" alt="">
            <div class="cart-body">
                <h3>${name}</h3>
                <p>${description}</p>

            <div class="price">
                <h3>$ ${price}</h3>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash"></i>
                    <div id="${id}" class="quantity">${search.product === undefined? 0:search.product}</div>
                    <i onclick="increment(${id})" class="bi bi-plus"></i>
                </div>
            </div>
            </div>
            </div>
        </div>
        `
        cartContainer.appendChild(details);
    })
}

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
    localStorage.setItem("data",JSON.stringify(basket));
}

const update = (itemId) =>{
    const quantity = document.getElementById(itemId);
    const search = basket.find(item => item.id === itemId);
    
    quantity.innerHTML = search.product;
    basketUpdate();
}

const basketUpdate = () =>{
    const cartAmount = document.getElementById("cartAmount");
    cartAmount.innerHTML = basket.map(item => item.product).reduce((x,y) => x+y, 0);
}

createCart();
basketUpdate();