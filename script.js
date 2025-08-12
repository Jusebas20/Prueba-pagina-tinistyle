let carrito = [];
let total = 0;

function agregarAlCarrito(producto, precio) {
    carrito.push({ producto, precio });
    total += precio;
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = '';
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.producto} - $${item.precio.toLocaleString()} COP`;
        lista.appendChild(li);
    });
    document.getElementById('total').textContent = `Total: $${total.toLocaleString()} COP`;
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    alert(`Gracias por tu compra en ToughStyle. Total: $${total.toLocaleString()} COP`);
    carrito = [];
    total = 0;
    actualizarCarrito();
}
