// Formato de moneda en COP
const formatterCOP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
});

// Lista de productos
const PRODUCTS = [
  { id: "p1", title: "Leggings High Waist - Mujer", price: 140000, desc: "Leggings con compresión y secado rápido.", img: "https://images.unsplash.com/photo-1520975663822-63e7c7f0b5b6?auto=format&fit=crop&w=800&q=60", category: "mujer" },
  { id: "p2", title: "Short Runner - Hombre", price: 100000, desc: "Short liviano con bolsillos para gel.", img: "https://images.unsplash.com/photo-1549909835-9b2f3bb0f6f8?auto=format&fit=crop&w=800&q=60", category: "hombre" },
  { id: "p3", title: "Camiseta Técnica - Hombre", price: 80000, desc: "Transpirable y antiolor.", img: "https://images.unsplash.com/photo-1520975913871-99ef58b2d9f8?auto=format&fit=crop&w=800&q=60", category: "hombre" },
  { id: "p4", title: "Top Deportivo - Mujer", price: 90000, desc: "Soporte medio y tirantes cruzados.", img: "https://images.unsplash.com/photo-1543286386-6ae27de6fefd?auto=format&fit=crop&w=800&q=60", category: "mujer" },
  { id: "p5", title: "Botella térmica 1L", price: 60000, desc: "Mantiene frío o caliente por horas.", img: "https://images.unsplash.com/photo-1532634896-26909d0d4b36?auto=format&fit=crop&w=800&q=60", category: "accesorios" },
  { id: "p6", title: "Guantes de entrenamiento", price: 70000, desc: "Agarre reforzado para pesas.", img: "https://images.unsplash.com/photo-1549237510-2f73c97d6a7f?auto=format&fit=crop&w=800&q=60", category: "accesorios" },
  { id: "p7", title: "Joggers confort - Hombre", price: 160000, desc: "Suaves y con bolsa profunda.", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d0b8?auto=format&fit=crop&w=800&q=60", category: "hombre" },
  { id: "p8", title: "Leggings Reflect - Mujer", price: 150000, desc: "Tiras reflectantes para entrenar de noche.", img: "https://images.unsplash.com/photo-1536681342711-1fb0f0e3a8b7?auto=format&fit=crop&w=800&q=60", category: "mujer" }
];

let cart = [];

// Elementos del DOM
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const modal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const modalQty = document.getElementById("modalQty");
const addToCartBtn = document.getElementById("addToCartBtn");
const closeModal = document.getElementById("closeModal");
const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const clearCart = document.getElementById("clearCart");
const checkoutBtn = document.getElementById("checkoutBtn");
const toast = document.getElementById("toast");
const yearEl = document.getElementById("year");

let selectedProduct = null;

// Renderizar productos
function renderProducts(list) {
  productsGrid.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p class="price">${formatterCOP.format(p.price)}</p>
      <button class="btn" data-id="${p.id}">Ver</button>
    `;
    productsGrid.appendChild(card);
  });
}

renderProducts(PRODUCTS);

// Abrir modal producto
productsGrid.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.dataset.id;
    selectedProduct = PRODUCTS.find(p => p.id === id);
    if (selectedProduct) {
      modalImg.src = selectedProduct.img;
      modalTitle.textContent = selectedProduct.title;
      modalDesc.textContent = selectedProduct.desc;
      modalPrice.textContent = formatterCOP.format(selectedProduct.price);
      modalQty.value = 1;
      modal.style.display = "block";
    }
  }
});

// Cerrar modal
closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

// Añadir al carrito
addToCartBtn.addEventListener("click", () => {
  const qty = parseInt(modalQty.value);
  const existing = cart.find(item => item.id === selectedProduct.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...selectedProduct, qty });
  }
  updateCart();
  showToast("Producto agregado al carrito");
  modal.style.display = "none";
});

// Mostrar carrito
cartBtn.addEventListener("click", () => cartSidebar.classList.add("open"));
closeCart.addEventListener("click", () => cartSidebar.classList.remove("open"));

// Actualizar carrito
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div class="cart-item-info">
        <h4>${item.title}</h4>
        <p>${formatterCOP.format(item.price)}</p>
        <input type="number" min="1" value="${item.qty}" data-id="${item.id}">
        <button data-remove="${item.id}">Eliminar</button>
      </div>
    `;
    cartItems.appendChild(row);
  });
  cartTotalEl.textContent = formatterCOP.format(total);
  cartCount.textContent = count;

  // Guardar en localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Cambiar cantidad o eliminar producto
cartItems.addEventListener("input", e => {
  if (e.target.type === "number") {
    const id = e.target.dataset.id;
    const item = cart.find(i => i.id === id);
    if (item) {
      item.qty = parseInt(e.target.value);
      updateCart();
    }
  }
});
cartItems.addEventListener("click", e => {
  if (e.target.dataset.remove) {
    cart = cart.filter(i => i.id !== e.target.dataset.remove);
    updateCart();
  }
});

// Vaciar carrito
clearCart.addEventListener("click", () => {
  cart = [];
  updateCart();
});

// Checkout
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("El carrito está vacío");
    return;
  }
  showToast("Procesando compra...");
  cart = [];
  updateCart();
});

// Toast
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// Filtro categoría
filterCategory.addEventListener("change", () => {
  const cat = filterCategory.value;
  const filtered = cat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
  renderProducts(filtered);
});

// Buscador
searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = PRODUCTS.filter(p => p.title.toLowerCase().includes(term));
  renderProducts(filtered);
});

// Año actual
yearEl.textContent = new Date().getFullYear();

// Cargar carrito guardado
window.addEventListener("load", () => {
  const saved = localStorage.getItem("cart");
  if (saved) {
    cart = JSON.parse(saved);
    updateCart();
  }
});
