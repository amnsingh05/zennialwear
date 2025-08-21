// Navbar Toggle for Mobile
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Cart
const cartBtn = document.getElementById('cart-btn');
const cart = document.getElementById('cart');
const closeCart = document.getElementById('close-cart');
const addCartButtons = document.querySelectorAll('.add-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cart-total');

let cartItems = [];

// Open/Close cart
cartBtn.addEventListener('click', () => {
  cart.style.right = "0";
});
closeCart.addEventListener('click', () => {
  cart.style.right = "-100%";
});

// Add to cart
addCartButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.closest('.product-card');
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);

    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({ name, price, quantity: 1 });
    }
    updateCart();
  });
});

// Update cart
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button onclick="removeItem(${index})">❌</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartTotal.textContent = total.toFixed(2);
}

// Remove item
function removeItem(index) {
  cartItems.splice(index, 1);
  updateCart();
}

// Checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
  alert("Proceeding to checkout...");
  // Here you can integrate payment system later
});
