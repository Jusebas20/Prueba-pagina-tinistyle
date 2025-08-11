// -------------------------
// VARIABLES GLOBALES
// -------------------------
let carrito = [];
let total = 0;

// -------------------------
// FUNCIONES DEL CARRITO
// -------------------------
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;
  document.getElementById("contador").textContent = carrito.length;
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("listaCarrito");
  lista.innerHTML = "";
  
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toLocaleString()} COP`;
    lista.appendChild(li);
  });

  document.getElementById("total").textContent = `Total: $${total.toLocaleString()} COP`;
}

// -------------------------
// EVENTOS DEL CARRITO
// -------------------------
document.getElementById("verCarrito").addEventListener("click", () => {
  document.getElementById("carritoModal").style.display = "block";
});

document.getElementById("cerrarModal").addEventListener("click", () => {
  document.getElementById("carritoModal").style.display = "none";
});

window.onclick = function(event) {
  if (event.target == document.getElementById("carritoModal")) {
    document.getElementById("carritoModal").style.display = "none";
  }
};

// -------------------------
// ANIMACIÓN DE BOTONES
// -------------------------
document.querySelectorAll(".product-card button").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "scale(1.05)";
    btn.style.boxShadow = "0 0 15px rgba(255, 46, 99, 0.8)";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
    btn.style.boxShadow = "none";
  });
});

// -------------------------
// EFECTO HOVER EN PRODUCTOS
// -------------------------
document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px)";
    card.style.boxShadow = "0 0 20px rgba(255, 46, 99, 0.5)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.05)";
  });
});
