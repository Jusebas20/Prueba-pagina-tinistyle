// Script principal de ToughStyle - Tienda de Ropa de GYM

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------
  // FUNCIÓN: Agregar productos al carrito
  // -------------------------------
  const botonesCompra = document.querySelectorAll(".producto button");

  botonesCompra.forEach(boton => {
    boton.addEventListener("click", () => {
      alert("🛒 Producto añadido al carrito con éxito");
    });
  });

  // -------------------------------
  // FUNCIÓN: Scroll suave en los enlaces del menú
  // -------------------------------
  document.querySelectorAll('nav ul li a').forEach(enlace => {
    enlace.addEventListener("click", function (e) {
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const seccion = document.querySelector(this.getAttribute("href"));
        if (seccion) {
          window.scrollTo({
            top: seccion.offsetTop - 60,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // -------------------------------
  // FUNCIÓN: Mostrar el año actual en el footer
  // -------------------------------
  const footer = document.querySelector("footer");
  if (footer) {
    const year = new Date().getFullYear();
    footer.innerHTML += `<br><small>© ${year} ToughStyle. Todos los derechos reservados.</small>`;
  }

  // -------------------------------
  // FUNCIÓN EXTRA: Efecto hover dinámico en productos
  // -------------------------------
  document.querySelectorAll(".producto").forEach(producto => {
    producto.addEventListener("mouseenter", () => {
      producto.style.boxShadow = "0 6px 15px rgba(0,0,0,0.25)";
    });
    producto.addEventListener("mouseleave", () => {
      producto.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    });
  });

});
