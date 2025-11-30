$(document).ready(function () {
    // const urlParams = new URLSearchParams(window.location.search); // Get category selected from index
    // let category = urlParams.get('category');

    //#region Color theme management
    
    // Al cargar la página, restablecer el tema guardado
    const savedTheme = localStorage.getItem("theme");

    // DESACTIVAR TRANSICIÓN PARA EL CAMBIO EN GO HOME BTN
    document.documentElement.classList.add("no-color-transition");

    // CONTROLAR EL TEMA PREESTABLECIDO
    if (savedTheme) {
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
        // Primera visita: seguir preferencia del sistema
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("dark", prefersDark);
    }
    
    // CAMBIAR EL TEMA SEGÚN LA PREFERENCIA DEL USUARIO
    if (savedTheme === "dark") {
        document.documentElement.classList.remove("light");
    } else if (savedTheme === "light") {
        document.documentElement.classList.add("light");
    }
    
    // CAMBIAR EL TEMA CON EL BOTÓN
    const toggleBtn = document.getElementById("toggle-theme");
    toggleBtn.addEventListener("click", () => {
        document.documentElement.classList.toggle("light");

        // Guarda la preferencia
        const isLight = document.documentElement.classList.contains("light");
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });

    // Elimina la clase justo después de pintar el frame inicial
    requestAnimationFrame(() => {
        document.documentElement.classList.remove("no-color-transition");
    });

    //#endregion

});