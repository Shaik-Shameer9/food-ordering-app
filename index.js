document.addEventListener("DOMContentLoaded", () => {

    const cartIcon = document.getElementById("cartIcon");

    cartIcon.addEventListener("click", (e) => {
        e.preventDefault();

        if (!localStorage.getItem("loggedIn")) {
            alert("Please login first to view cart ❌");
            window.location.href = "images/login.html";
            return;
        }

        const modal = new bootstrap.Modal(
            document.getElementById("cartModal")
        );
        modal.show();
    });

});





document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("themeToggle");

    if (!toggleBtn) return;

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        toggleBtn.innerText = "☀️";
    }

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            toggleBtn.innerText = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            toggleBtn.innerText = "🌙";
            localStorage.setItem("theme", "light");
        }
    });
});

// 🔒 BLOCK ACCESS IF NOT LOGGED IN
if (!localStorage.getItem("loggedIn")) {
    // allow viewing page but block cart actions
    console.log("User not logged in");
}


let cart = {};
let cartCount = 0;

document.querySelectorAll(".food-card").forEach(card => {
    const price = Number(card.dataset.price);
    const name = card.dataset.name;

    const qtyEl = card.querySelector(".qty");
    const totalEl = card.querySelector(".total");

    let qty = 0;

    card.querySelector(".plus").addEventListener("click", () => {
    if (!localStorage.getItem("loggedIn")) {
    alert("Please login first ❌");
    qty = 0;
    update();
    window.location.href = "images/login.html";
    return;
}


    if (qty < 1000) {
        qty++;
        update();
    }
});


   card.querySelector(".minus").addEventListener("click", () => {
    if (!localStorage.getItem("loggedIn")) {
    alert("Please login first ❌");
    qty = 0;
    update();
    window.location.href = "images/login.html";
    return;
}


    if (qty > 0) {
        qty--;
        update();
    }
});


    card.querySelector(".add-to-cart").addEventListener("click", () => {

    // 🔒 LOGIN CHECK (MANDATORY)
    if (!localStorage.getItem("loggedIn")) {
        alert("Please login first to add items to cart ❌");
        window.location.href = "images/login.html"; // ✅ correct for your project
        return;
    }

    if (qty === 0) {
        alert("Select quantity first");
        return;
    }

    if (cart[name]) {
        cart[name].qty += qty;
    } else {
        cart[name] = { price, qty };
    }

    qty = 0;
    update();
    renderCart();
});



    function update() {
        qtyEl.innerText = qty;
        totalEl.innerText = qty * price;
    }
});



function updateCartQty(item, change) {
    cart[item].qty += change;

    if (cart[item].qty <= 0) {
        delete cart[item];
    }

    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartBadge = document.getElementById("cartCount");

    cartItems.innerHTML = "";
    let total = 0;
    cartCount = 0;

    for (let item in cart) {
        const { price, qty } = cart[item];
        const itemTotal = price * qty;
        total += itemTotal;
        cartCount += qty;


        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            <div>
                <strong>${item}</strong><br>
                ₹${price} × ${qty} = ₹${itemTotal}
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-sm btn-danger"
                    onclick="updateCartQty('${item}', -1)">−</button>
                <span><b>${qty}</b></span>
                <button class="btn btn-sm btn-success"
                    onclick="updateCartQty('${item}', 1)">+</button>
            </div>
        `;

        cartItems.appendChild(li);
    }

    cartTotal.innerText = total;
    cartBadge.innerText = cartCount;
}

document.querySelectorAll(".order-btn").forEach(button => {
    button.addEventListener("click", () => {
        if (!localStorage.getItem("loggedIn")) {
            alert("Please login first!");
            window.location.href = "images/login.html";
        } else {
            const msg = document.createElement("div");
msg.innerText = "You can place your order now 👍";
msg.style.background = "green";
msg.style.color = "white";
msg.style.padding = "10px";
msg.style.position = "fixed";
msg.style.top = "20px";
msg.style.right = "20px";
msg.style.borderRadius = "5px";

document.body.appendChild(msg);

// 🔹 Timing Event
setTimeout(() => {
    msg.remove();
}, 3000);

        }
    });
});
// 🔹 Keyboard Event - Search (filter while typing, scroll on Enter)
const searchInput = document.querySelector(".search-box");

searchInput.addEventListener("keyup", (event) => {
    const value = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".food-card");

    let firstMatch = null;

    cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const column = card.closest(".col-md-3");

        if (name.includes(value)) {
            column.style.display = "";
            if (!firstMatch) firstMatch = column;
        } else {
            column.style.display = "none";
        }
    });

    // ✅ Scroll ONLY when Enter key is pressed
    if (event.key === "Enter" && firstMatch) {
        firstMatch.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
});

// ⏱️ Simple Timing Event (TOP CENTER)
setTimeout(() => {
    const msg = document.createElement("div");
    msg.innerText = "Welcome to SMR Catering Services!";

    msg.style.position = "fixed";
    msg.style.top = "20px";              
    msg.style.left = "50%";              
    msg.style.transform = "translateX(-50%)";

    msg.style.background = "#ff9800";
    msg.style.color = "white";
    msg.style.padding = "15px 25px";
    msg.style.fontSize = "18px";
    msg.style.fontWeight = "bold";
    msg.style.borderRadius = "10px";
    msg.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
    msg.style.zIndex = "9999";

    document.body.appendChild(msg);

    
    setTimeout(() => {
        msg.remove();
    }, 1000);

}, 2000);
document.getElementById("checkoutBtn").addEventListener("click", () => {

    // 🔒 Login check
    if (!localStorage.getItem("loggedIn")) {
        alert("Please login first!");
        window.location.href = "images/login.html";
        return;
    }

    // 🛒 Cart check
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // 📥 Read form values FIRST
    const name = document.getElementById("custName").value.trim();
    const mobile = document.getElementById("custMobile").value.trim();
    const address = document.getElementById("custAddress").value.trim();
    const payment = document.getElementById("paymentMode").value;
    const deliveryDate = document.getElementById("deliveryDate").value;
    const deliveryTime = document.getElementById("deliveryTime").value;
    const mealType = document.getElementById("mealType").value;

    // ✅ Validation
    if (
        !name || !mobile || !address || !payment ||
        !deliveryDate || !deliveryTime || !mealType
    ) {
        alert("Please fill all checkout details!");
        return;
    }

    // 📦 Prepare order data
    const orderData = {
        customer_name: name,
        mobile,
        address,
        delivery_date: deliveryDate,
        delivery_time: deliveryTime,
        meal_type: mealType,
        payment_mode: payment,
        total_amount: Number(document.getElementById("cartTotal").innerText),
        order_items: cart


    };

    // 🚀 Send to backend
    fetch("http://localhost:3000/place-order", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    })
    .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.text();
    })
    .then(() => {
        alert("🎉 Order placed successfully!");
        cart = {};
        renderCart();
        bootstrap.Modal.getInstance(
            document.getElementById("cartModal")
        ).hide();
    })
    .catch(err => {
        console.error(err);
        alert("❌ Failed to save order");
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const loginText = document.getElementById("sam");
    const loginLink = document.getElementById("loginLink");

    if (localStorage.getItem("loggedIn")) {
        loginText.innerText = "🚪 Logout";
        loginLink.href = "#";

        loginLink.onclick = () => {
            localStorage.clear();
            cart = {};
            alert("Logged out successfully ✅");
            window.location.href = "images/login.html";
        };
    } else {
        loginText.innerText = "🛃 Login";
        loginLink.href = "images/login.html";
    }
});




