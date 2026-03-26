const products = [
    { id: 1, name: "Wireless Headphones", price: 59.99, emoji: "🎧" },
    { id: 2, name: "Mechanical Keyboard", price: 89.99, emoji: "⌨️" },
    { id: 3, name: "USB-C Hub", price: 34.99, emoji: "🔌" },
    { id: 4, name: "Webcam HD", price: 49.99, emoji: "📷" },
    { id: 5, name: "Mouse Pad XL", price: 19.99, emoji: "🖱️" },
    { id: 6, name: "LED Desk Lamp", price: 29.99, emoji: "💡" },
    { id: 7, name: "Phone Stand", price: 14.99, emoji: "📱" },
    { id: 8, name: "Portable SSD 1TB", price: 109.99, emoji: "💾" }
];

const cart = [];
const TAX_RATE = 0.13;

// ── Render Products ────────────────────────────────────

const render_products = () => {
    const container = document.getElementById("product_list");
    container.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product_card");

        card.innerHTML = `
            <span class="product_emoji">${product.emoji}</span>
            <div class="product_info">
                <p class="product_name">${product.name}</p>
                <p class="product_price">$${product.price.toFixed(2)}</p>
            </div>
            <button onclick="add_to_cart(${product.id})" class="add_button">Add</button>
        `;
        container.appendChild(card);
    });
};

// ── Cart Operations ────────────────────────────────────

const add_to_cart = (product_id) => {
    const product = products.find(p => p.id === product_id);
    const existing = cart.find(item => item.id === product_id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    render_cart();
};

const remove_from_cart = (product_id) => {
    const index = cart.findIndex(item => item.id === product_id);
    if (index !== -1) cart.splice(index, 1);
    render_cart();
};

const change_quantity = (product_id, delta) => {
    const item = cart.find(i => i.id === product_id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        remove_from_cart(product_id);
        return;
    }
    render_cart();
};

const clear_cart = () => {
    cart.length = 0;
    render_cart();
};

// ── Render Cart ────────────────────────────────────────

const render_cart = () => {
    const cart_list = document.getElementById("cart_list");
    const empty_msg = document.getElementById("empty_cart_msg");
    const cart_summary = document.getElementById("cart_summary");

    cart_list.innerHTML = "";

    if (cart.length === 0) {
        cart_list.appendChild(empty_msg);
        empty_msg.style.display = "block";
        cart_summary.classList.add("hidden");
        update_badge(0);
        return;
    }

    empty_msg.style.display = "none";

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart_item");

        div.innerHTML = `
            <span class="cart_emoji">${item.emoji}</span>
            <div class="cart_info">
                <p class="cart_name">${item.name}</p>
                <p class="cart_unit_price">$${item.price.toFixed(2)} each</p>
            </div>
            <div class="quantity_control">
                <button onclick="change_quantity(${item.id}, -1)" class="qty_button">−</button>
                <span class="qty_value">${item.quantity}</span>
                <button onclick="change_quantity(${item.id}, +1)" class="qty_button">+</button>
            </div>
            <div class="cart_item_total">$${(item.price * item.quantity).toFixed(2)}</div>
            <button onclick="remove_from_cart(${item.id})" class="remove_button">✕</button>
        `;
        cart_list.appendChild(div);
    });

    cart_summary.classList.remove("hidden");
    update_totals();
};

// ── Totals & Badge ─────────────────────────────────────

const update_totals = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const grand_total = subtotal + tax;

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax_amount").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("grand_total").textContent = `$${grand_total.toFixed(2)}`;

    const total_items = cart.reduce((sum, item) => sum + item.quantity, 0);
    update_badge(total_items);
};

const update_badge = (count) => {
    document.getElementById("cart_item_count").textContent = count;
};

// ── Init ───────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
    render_products();
    render_cart();
});