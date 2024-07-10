let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add an item to the cart
function addToCart(name, price, sizeId) {
    const size = document.getElementById(sizeId).value;
    const existingItem = cart.find(item => item.name === name && item.size === size);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const item = {
            name,
            price,
            size,
            quantity: 1
        };
        cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} (Size: ${size}) has been added to your cart.`);
}

// Function to update the cart display in the cart.html page
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const itemTotalWithTax = itemTotal * 1.12; // Calculate total with 12% tax

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.size}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${itemTotalWithTax.toFixed(2)}</td>
        `;
        cartItems.appendChild(tr);
        total += itemTotal;
    });

    const totalWithTax = total * 1.12; // Calculate total with 12% tax
    totalPrice.textContent = totalWithTax.toFixed(2);
}

// Function to clear the cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Function to handle checkout
function checkout() {
    alert('Proceeding to checkout...');
    // Implement further checkout process as required
}

// Load the cart when the page is loaded
window.onload = function() {
    if (document.getElementById('cart-items')) {
        updateCart();
    }
};
