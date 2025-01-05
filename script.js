let cart = [];

// Function to add an item to the cart
function addToCart(itemName, itemPrice) {
    const existingItem = cart.find((item) => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if the item exists
    } else {
        const cartItem = { name: itemName, price: itemPrice, quantity: 1 };
        cart.push(cartItem); // Add a new item to the cart
    }

    updateCartDetails();
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
    const itemIndex = cart.findIndex((item) => item.name === itemName);

    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1); 
        }
    }

    updateCartDetails();
}

function updateCartDetails() {
    const cartDetails = document.querySelector("#cart-details");
    const cartTotal = document.querySelector("#cart-total");
    const cartCount = document.querySelector("#cart-count");

    // Update cart count
    if (cartCount) {
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalQuantity;
    }

    // Update cart items
    if (cartDetails) {
        cartDetails.innerHTML = cart.length
            ? cart
                  .map(
                      (item) =>
                          `<div class="cart-item">
                              <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
                              <div class="cart-controls">
                                  <button class="btn-decrement" data-name="${item.name}">-</button>
                                  <button class="btn-increment" data-name="${item.name}">+</button>
                              </div>
                          </div>`
                  )
                  .join("")
            : "<p>Your cart is empty.</p>";
    }

    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    attachCartControlListeners();
}

function attachCartControlListeners() {
    const incrementButtons = document.querySelectorAll(".btn-increment");
    const decrementButtons = document.querySelectorAll(".btn-decrement");

    // Attach event listeners for increment buttons
    incrementButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const itemName = event.target.getAttribute("data-name");
            if (itemName) {
                const item = cart.find((product) => product.name === itemName);
                if (item) addToCart(item.name, item.price);
            }
        });
    });

    // Attach event listeners for decrement buttons
    decrementButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const itemName = event.target.getAttribute("data-name");
            if (itemName) {
                removeFromCart(itemName);
            }
        });
    });
}

// Function to finalize the purchase
function finalizePurchase() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Thank you for your purchase! Total: $${totalAmount.toFixed(2)}`);
    cart = [];
    updateCartDetails();
}

function toggleCartMenu() {
    const cartMenu = document.querySelector("#cart-menu");
    if (cartMenu) {
        cartMenu.style.display = cartMenu.style.display === "block" ? "none" : "block";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const buyButtons = document.querySelectorAll(".box button");
    buyButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productBox = button.parentElement;
            const itemName = productBox.querySelector("h5").textContent;
            const itemPrice = parseFloat(
                productBox.querySelector("h6").textContent.replace("$", "")
            );

            addToCart(itemName, itemPrice);
        });
    });

    // Event listener for cart icon
    const cartIcon = document.querySelector(".bx-shopping-bag");
    if (cartIcon) {
        cartIcon.addEventListener("click", toggleCartMenu);
    }

    // Event listener for finalize purchase button
    const finalizeButton = document.querySelector("#finalize-purchase");
    if (finalizeButton) {
        finalizeButton.addEventListener("click", finalizePurchase);
    }

    // Initially hide the cart menu
    const cartMenu = document.querySelector("#cart-menu");
    if (cartMenu) {
        cartMenu.style.display = "none";
    }
});
// Handle form submission
document.querySelector('.contact-form button').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get form input values
    const name = document.querySelector('.contact-form input[type="text"]').value;
    const email = document.querySelector('.contact-form input[type="email"]').value;
    const message = document.querySelector('.contact-form textarea').value;

    // Check if all fields are filled
    if (name === '' || email === '' || message === '') {
        alert("Please fill in all fields.");
        return; // Stop further execution if validation fails
    }

    // Basic email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // If validation passes, simulate sending the message
    console.log(`Message Sent:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);

    // Clear the form after submission
    document.querySelector('.contact-form input[type="text"]').value = '';
    document.querySelector('.contact-form input[type="email"]').value = '';
    document.querySelector('.contact-form textarea').value = '';

    // Show a success message
    alert("Thank you for contacting us! We will get back to you soon.");
});

