/* ========== Datos de productos (puedes editarlos) ========== */
const PRODUCTS = [
  {
    id: "p1",
    title: "Leggings High Waist - Mujer",
    price: 34.99,
    desc: "Leggings con compresión y secado rápido.",
    img: "https://images.unsplash.com/photo-1520975663822-63e7c7f0b5b6?auto=format&fit=crop&w=800&q=60",
    category: "mujer"
  },
  {
    id: "p2",
    title: "Short Runner - Hombre",
    price: 24.99,
    desc: "Short liviano con bolsillos para gel.",
    img: "https://images.unsplash.com/photo-1549909835-9b2f3bb0f6f8?auto=format&fit=crop&w=800&q=60",
    category: "hombre"
  },
  {
    id: "p3",
    title: "Camiseta Técnica - Hombre",
    price: 19.99,
    desc: "Transpirable y antiolor.",
    img: "https://images.unsplash.com/photo-1520975913871-99ef58b2d9f8?auto=format&fit=crop&w=800&q=60",
    category: "hombre"
  },
  {
    id: "p4",
    title: "Top Deportivo - Mujer",
    price: 22.5,
    desc: "Soporte medio y tirantes cruzados.",
    img: "https://images.unsplash.com/photo-1543286386-6ae27de6fefd?auto=format&fit=crop&w=800&q=60",
    category: "mujer"
  },
  {
    id: "p5",
    title: "Botella térmica 1L",
    price: 14.99,
    desc: "Mantiene frío o caliente por horas.",
    img: "https://images.unsplash.com/photo-1532634896-26909d0d4b36?auto=format&fit=crop&w=800&q=60",
    category: "accesorios"
  },
  {
    id: "p6",
    title: "Guantes de entrenamiento",
    price: 17.99,
    desc: "Agarre reforzado para pesas.",
    img: "https://images.unsplash.com/photo-1549237510-2f73c97d6a7f?auto=format&fit=crop&w=800&q=60",
    category: "accesorios"
  },
  {
    id: "p7",
    title: "Joggers confort - Hombre",
    price: 39.5,
    desc: "Suaves y con bolsa profunda.",
    img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d0b8?auto=format&fit=crop&w=800&q=60",
    category: "hombre"
  },
  {
    id: "p8",
    title: "Leggings Reflect - Mujer",
    price: 36.0,
    desc: "Tiras reflectantes para entrenar de noche.",
    img: "https://images.unsplash.com/photo-1536681342711-1fb0f0e3a8b7?auto=format&fit=crop&w=800&q=60",
    category: "mujer"
  }
];

/* ========== Elementos del DOM ========== */
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const clearCartBtn = document.getElementById("clearCart");
const checkoutBtn = document.getElementById("checkoutBtn");
const toast = document.getElementById("toast");

/* Modal */
const productModal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const modalQty = document.getElementById("modalQty");
const addToCartBtn = document.getElementById("addToCartBtn");

/* Calendar & footer */
const calendar = document.getElementById("calendar");
document.getElementById("year").textContent = new Date().getFullYear();

/* ========== Carrito en localStorage ========== */
let CART = JSON.parse(localStorage.getItem("fitcart_v1")) || { items: [] };

function saveCart(){
  localStorage.setItem("fitcart_v1", JSON.stringify(CART));
}

/* ========== Render de productos ========== */
function renderProducts(list){
  productsGrid.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.img}" alt="${escapeHtml(p.title)}" loading="lazy">
      <h4>${escapeHtml(p.title)}</h4>
      <p class="muted">${escapeHtml(p.desc)}</p>
      <div class="price">$${p.price.toFixed(2)}</div>
      <div class="actions">
        <button class="btn" data-id="${p.id}" onclick="openProductModal('${p.id}')">Ver</button>
        <button class="btn primary" data-id="${p.id}" onclick="quickAdd('${p.id}')">Comprar</button>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

/* Escape básico para texto inyectado */
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])); }

/* ========== Filtrado y búsqueda ========== */
function applyFilters(){
  const q = searchInput.value.trim().toLowerCase();
  const cat = filterCategory.value;
  const filtered = PRODUCTS.filter(p => {
    const matchesQ = (p.title + " " + p.desc).toLowerCase().includes(q);
    const matchesC = (cat === "all") ? true : (p.category === cat);
    return matchesQ && matchesC;
  });
  renderProducts(filtered);
}

/* Listeners de búsqueda y filtro */
searchInput.addEventListener("input", applyFilters);
filterCategory.addEventListener("change", applyFilters);

/* ========== Modal producto ========== */
function openProductModal(id){
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  modalImg.src = p.img;
  modalImg.alt = p.title;
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalPrice.textContent = `$${p.price.toFixed(2)}`;
  modalQty.value = 1;
  addToCartBtn.dataset.id = p.id;
  productModal.style.display = "flex";
  productModal.setAttribute("aria-hidden", "false");
}
closeModal.addEventListener("click", () => {
  productModal.style.display = "none";
  productModal.setAttribute("aria-hidden", "true");
});
window.addEventListener("click", (ev) => {
  if(ev.target === productModal){
    productModal.style.display = "none";
    productModal.setAttribute("aria-hidden", "true");
  }
});

/* ========== Agregar al carrito ========== */
function addToCart(id, qty=1){
  const prod = PRODUCTS.find(p => p.id===id);
  if(!prod) return;
  const existing = CART.items.find(it => it.id === id);
  if(existing) existing.qty += qty;
  else CART.items.push({ id: prod.id, title: prod.title, price: prod.price, img: prod.img, qty: qty });
  saveCart();
  renderCart();
  showToast("Producto agregado");
}
addToCartBtn.addEventListener("click", () => {
  const id = addToCartBtn.dataset.id;
  const qty = Math.max(1, parseInt(modalQty.value || 1));
  addToCart(id, qty);
  productModal.style.display = "none";
});

/* Quick add (botón comprar) */
function quickAdd(id){
  addToCart(id, 1);
}

/* ========== Render carrito ========== */
function renderCart(){
  cartItemsContainer.innerHTML = "";
  let total = 0;
  CART.items.forEach((it, idx) => {
    total += it.price * it.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${it.img}" alt="${escapeHtml(it.title)}">
      <div style="flex:1;">
        <div style="font-weight:700">${escapeHtml(it.title)}</div>
        <div style="color:#666; font-size:.95rem;">$${it.price.toFixed(2)} x ${it.qty}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:.3rem;">
        <button class="btn" onclick="changeQty(${idx}, 1)">+</button>
        <button class="btn" onclick="changeQty(${idx}, -1)">-</button>
        <button class="btn" onclick="removeItem(${idx})">Eliminar</button>
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });
  cartTotalEl.textContent = `$${total.toFixed(2)}`;
  cartCount.textContent = CART.items.reduce((s,i)=>s+i.qty,0);
}
function changeQty(index, delta){
  const it = CART.items[index];
  if(!it) return;
  it.qty += delta;
  if(it.qty < 1) CART.items.splice(index,1);
  saveCart();
  renderCart();
}
function removeItem(index){
  CART.items.splice(index,1);
  saveCart();
  renderCart();
}

/* ========== Cart sidebar toggles ========== */
cartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("open");
  cartSidebar.setAttribute("aria-hidden", "false");
});
closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
  cartSidebar.setAttribute("aria-hidden", "true");
});

/* Clear cart & checkout */
clearCartBtn.addEventListener("click", () => {
  if(confirm("Vaciar carrito?")) {
    CART.items = [];
    saveCart();
    renderCart();
  }
});
checkoutBtn.addEventListener("click", () => {
  if(CART.items.length === 0){ alert("El carrito está vacío."); return; }
  // Simulación checkout
  alert(`Gracias por tu compra. Total: ${cartTotalEl.textContent}`);
  CART.items = [];
  saveCart();
  renderCart();
});

/* ========== Small helpers ========== */
function showToast(msg, ms=1400){
  toast.textContent = msg;
  toast.style.display = "block";
  toast.setAttribute("aria-hidden","false");
  setTimeout(()=>{ toast.style.display="none"; toast.setAttribute("aria-hidden","true"); }, ms);
}

/* Open product modal handler required by markup */
window.openProductModal = openProductModal;
window.quickAdd = quickAdd;
window.changeQty = changeQty;
window.removeItem = removeItem;

/* ========== Calendar rendering (toma las tareas guardadas en localStorage) ========== */
function renderCalendar(){
  // Si el usuario tiene guardadas "tareas" por producto, podríamos mostrarlas.
  // Aquí mostramos fechas de productos añadidos (ejemplo): cada item en cart con fecha simulada.
  calendar.innerHTML = "";
  // Si existieran tareas específicas guardadas por producto en localStorage,
  // se podrían leer aquí; por ahora mostramos el contenido del carrito (si hay).
  if(CART.items.length === 0){
    calendar.innerHTML = "<p style='color:#666'>No hay entregas/fechas guardadas.</p>";
    return;
  }
  const rows = CART.items.map(it => {
    const d = new Date();
    d.setDate(d.getDate() + 7); // ejemplo fecha futura
    return `<div class="calendar-entry"><strong>${escapeHtml(it.title)}</strong> — entrega estimada: <em>${d.toLocaleDateString()}</em></div>`;
  });
  calendar.innerHTML = rows.join("");
}

/* ========== Inicialización ========== */
(function init(){
  renderProducts(PRODUCTS);
  applyFilters();
  renderCart();
  renderCalendar();
})();
