let mobiles = [

    {
        id: 1,
        name: "iPhone 15",
        price: 65000,
        category: "Apple",
        image: "./images/iPhone17.jpg"
    },

    {
        id: 2,
        name: "Samsung S24",
        price: 55000,
        category: "Samsung",
        image: "./images/samsung.jpg"
    },

    {
        id: 3,
        name: "OnePlus 12",
        price: 45000,
        category: "OnePlus",
        image: "./images/oneplus.jpg"
    },

    {
        id: 4,
        name: "Google Pixel 8",
        price: 50000,
        category: "Google",
        image: "./images/pixel10.jpg"
    },

    {
        id: 5,
        name: "Redmi 17",
        price: 30000,
        category: "Redmi",
        image: "./images/redmi17.jpg"
    },

    {
        id: 6,
        name: "Nothing 4",
        price: 35000,
        category: "Nothing",
        image: "./images/nothing4.jpg"
    }

];


let cart = [];


/* ELEMENTS */

let search = document.getElementById("search");

let category = document.getElementById("category");

let products = document.getElementById("products");

let sort = document.getElementById("sort");

let cartItems = document.getElementById("cartItems");

let total = document.getElementById("total");

let cartCount = document.getElementById("cartCount");

let cartBtn = document.getElementById("cartBtn");

let cartBox = document.getElementById("cart");

let closeCart = document.getElementById("closeCart");

let overlay = document.getElementById("overlay");

let buyBtn = document.getElementById("buyBtn");

let orderScreen = document.getElementById("orderScreen");

let continueBtn = document.getElementById("continueBtn");


/* DISPLAY MOBILES */

function displayMobiles() {

    products.innerHTML = "";

    let searchText = search.value.toLowerCase();

    let selectedCategory = category.value;

    let found = false;


    for (let i = 0; i < mobiles.length; i++) {

        let mobileName =
            mobiles[i].name.toLowerCase();

        let mobileBrand =
            mobiles[i].category.toLowerCase();


        let searchMatch =
            mobileName.includes(searchText) ||
            mobileBrand.includes(searchText);


        let categoryMatch =
            selectedCategory == "all" ||
            mobileBrand == selectedCategory.toLowerCase();


        if (searchMatch && categoryMatch) {

            found = true;


            products.innerHTML += `

                <div class="product highlight">

                    <img src="${mobiles[i].image}">

                    <p class="product-category">
                        ${mobiles[i].category}
                    </p>

                    <h2>
                        ${mobiles[i].name}
                    </h2>

                    <p class="price">
                        ₹${mobiles[i].price}
                    </p>

                    <button
                        class="add-btn"
                        onclick="addToCart(${mobiles[i].id})">

                        Add to Cart

                    </button>

                </div>

            `;
        }
    }


    if (found == false) {

        products.innerHTML = `

            <div class="no-products">

                <div>🔍</div>

                <h3>No mobile found</h3>

                <p>
                    Try another mobile or brand.
                </p>

            </div>

        `;
    }
}


/* SEARCH */

search.addEventListener("input", function() {

    displayMobiles();

});


/* CATEGORY */

category.addEventListener("change", function() {

    displayMobiles();

});


/* ADD TO CART */

function addToCart(id) {

    let found = false;


    for (let i = 0; i < cart.length; i++) {

        if (cart[i].id == id) {

            cart[i].quantity++;

            found = true;

            break;
        }
    }


    if (found == false) {

        for (let i = 0; i < mobiles.length; i++) {

            if (mobiles[i].id == id) {

                let newItem = {

                    id: mobiles[i].id,

                    name: mobiles[i].name,

                    price: mobiles[i].price,

                    image: mobiles[i].image,

                    quantity: 1

                };


                cart[cart.length] = newItem;

                break;
            }
        }
    }


    displayCart();

    openCart();
}


/* DISPLAY CART */

function displayCart() {

    cartItems.innerHTML = "";

    let cartTotal = 0;

    let itemCount = 0;


    if (cart.length == 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div>🛒</div>

                <p>Your cart is empty</p>

            </div>

        `;
    }


    for (let i = 0; i < cart.length; i++) {

        let itemTotal =
            cart[i].price * cart[i].quantity;


        cartTotal =
            cartTotal + itemTotal;


        itemCount =
            itemCount + cart[i].quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <img src="${cart[i].image}">


                <div class="cart-info">

                    <h3>
                        ${cart[i].name}
                    </h3>

                    <div class="cart-price">
                        ₹${cart[i].price}
                    </div>


                    <div class="quantity">

                        <button
                            onclick="decreaseQuantity(${cart[i].id})">

                            −

                        </button>


                        <span>
                            ${cart[i].quantity}
                        </span>


                        <button
                            onclick="increaseQuantity(${cart[i].id})">

                            +

                        </button>

                    </div>


                    <button
                        class="remove-btn"
                        onclick="removeItem(${cart[i].id})">

                        Remove

                    </button>

                </div>

            </div>

        `;
    }


    total.innerHTML = cartTotal;

    cartCount.innerHTML = itemCount;
}


/* INCREASE */

function increaseQuantity(id) {

    for (let i = 0; i < cart.length; i++) {

        if (cart[i].id == id) {

            cart[i].quantity++;

            break;
        }
    }


    displayCart();
}


/* DECREASE */

function decreaseQuantity(id) {

    for (let i = 0; i < cart.length; i++) {

        if (cart[i].id == id) {

            cart[i].quantity--;


            if (cart[i].quantity == 0) {

                removeItem(id);

                return;
            }


            break;
        }
    }


    displayCart();
}


/* REMOVE */

function removeItem(id) {

    for (let i = 0; i < cart.length; i++) {

        if (cart[i].id == id) {

            for (
                let j = i;
                j < cart.length - 1;
                j++
            ) {

                cart[j] = cart[j + 1];

            }


            cart.length =
                cart.length - 1;


            break;
        }
    }


    displayCart();
}


/* SORT */

sort.addEventListener("change", function() {

    if (sort.value == "low") {

        mobiles.sort(function(a, b) {

            return a.price - b.price;

        });

    }


    else if (sort.value == "high") {

        mobiles.sort(function(a, b) {

            return b.price - a.price;

        });

    }


    displayMobiles();

});


/* OPEN CART */

cartBtn.addEventListener("click", function() {

    openCart();

});


function openCart() {

    cartBox.classList.add("open");

    overlay.classList.add("open");

}


/* CLOSE CART */

closeCart.addEventListener("click", function() {

    closeCartBox();

});


overlay.addEventListener("click", function() {

    closeCartBox();

});


function closeCartBox() {

    cartBox.classList.remove("open");

    overlay.classList.remove("open");

}


/* BUY NOW */

buyBtn.addEventListener("click", function() {

    if (cart.length == 0) {

        alert("Your cart is empty!");

        return;
    }


    cart = [];


    displayCart();

    closeCartBox();

    orderScreen.classList.add("open");

});


/* CONTINUE SHOPPING */

continueBtn.addEventListener("click", function() {

    orderScreen.classList.remove("open");

});


/* START */

displayMobiles();