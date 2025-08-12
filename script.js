document.addEventListener("DOMContentLoaded", () => {
    console.log("Página ToughStyle cargada correctamente.");

    // ✅ Logo dinámico (por si quieres cambiarlo fácilmente desde JS)
    const logoContainer = document.querySelector(".logo-container");
    if (logoContainer) {
        const logoImg = logoContainer.querySelector(".logo");
        if (logoImg) {
            logoImg.src = "logo-pagina.jpg"; // Nombre exacto del archivo que subiste a tu repo
            logoImg.alt = "Logo ToughStyle";
        }
    }

    // 🔹 Ejemplo: Acción de botones de compra
    const botonesCompra = document.querySelectorAll(".producto button");
    botonesCompra.forEach(boton => {
        boton.addEventListener("click", () => {
            alert("Gracias por tu compra en ToughStyle 🏋️‍♂️💪");
        });
    });

    // 🔹 Ejemplo: Validación de formulario de contacto
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            alert("Gracias por tu mensaje. Nos pondremos en contacto pronto.");
            form.reset();
        });
    }
});
