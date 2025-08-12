// Mensaje de bienvenida en consola
console.log("Bienvenido a ToughStyle 🏋️‍♂️");

// Función para manejar el botón de compra
function comprarProducto(nombre, precio) {
    Swal.fire({
        title: '¡Producto añadido al carrito!',
        html: `<strong>${nombre}</strong><br>Precio: ${precio} COP`,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ff4081',
        background: '#fff',
        color: '#333'
    });
}

// Listener para todos los botones de compra
document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".producto button");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const producto = boton.parentElement;
            const nombre = producto.querySelector("h3").textContent;
            const precio = producto.querySelector("p").textContent;
            comprarProducto(nombre, precio);
        });
    });
});

// Envío del formulario de contacto
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        Swal.fire({
            title: '¡Mensaje enviado!',
            text: 'Nos pondremos en contacto contigo pronto.',
            icon: 'success',
            confirmButtonColor: '#ff4081'
        });
        form.reset();
    });
});
