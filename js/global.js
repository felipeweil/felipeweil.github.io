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
    document.documentElement.classList.toggle("light", savedTheme === "light");
} else {
    // Primera visita: seguir preferencia del sistema
    const prefersDark = window.matchMedia("(prefers-color-scheme: light)").matches;
    document.documentElement.classList.toggle("light", prefersDark);
}

// CAMBIAR EL TEMA SEGÚN LA PREFERENCIA DEL USUARIO
if (savedTheme === "light") {
    document.documentElement.classList.remove("dark");
} else if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
}

// CAMBIAR EL TEMA CON EL BOTÓN
const toggleBtn = document.getElementById("toggle-theme");
toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    // Guarda la preferencia
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Elimina la clase justo después de pintar el frame inicial
requestAnimationFrame(() => {
    document.documentElement.classList.remove("no-color-transition");
});

//#endregion

//#region Change lang

const stored = localStorage.getItem("lang") || "EN";
loadLanguage(stored);

// BOTÓNES
document.getElementById("lang-es").onclick = () => loadLanguage("ES");
document.getElementById("lang-en").onclick = () => loadLanguage("EN");

// FUNCIÓN PARA CAMBIAR EL LENGUAJE
async function loadLanguage(lang) {
    // GET JSON
    const res = await fetch('../resources/lang.json');
    const data = await res.json();

    // Convertimos el array JSON a un diccionario { Key: {EN, ES} }
    const dictionary = {};
    data.forEach(entry => {
        if (entry.Key) dictionary[entry.Key] = entry;
    });

    // Recorremos los elementos traducibles
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;

        // Comprobamos que exista la clave
        if (dictionary[key] && dictionary[key][lang]) {
            // Usamos innerHTML para permitir spans u otras etiquetas
            el.innerHTML = dictionary[key][lang];
        }
    });

    // GUARDAR PREFERENCIA
    localStorage.setItem("lang", lang);

    // AÑADIR "//" DE COMENTARIOS
    addLineComments();
}

//#endregion

//#region Q, intert comment //

// Ejecutar cuando todo se haya renderizado
window.addEventListener('resize', addLineComments);

function addLineComments() {
    const paragraphs = document.querySelectorAll('.q');    

    paragraphs.forEach(container => {
        // Limpiar comentarios previos
        container.querySelectorAll('.line-comment').forEach(span => span.remove());

        // Recorremos solo nodos de texto directos y elementos de bloque
        container.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE  /* && node.tagName != 'br'*/) {
                const range = document.createRange();
                range.selectNodeContents(node);
                const rects = range.getClientRects();

                for (let rect of rects) {
                    const comment = document.createElement('span');
                    comment.className = 'line-comment';
                    comment.textContent = '//';
                    comment.style.top = `${rect.top - container.getBoundingClientRect().top}px`;
                    container.appendChild(comment);
                }
            }
        });
    });
}


//#endregion

//#region Parallax

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelector('.parallax-1').style.transform = `translateY(${scrollY * 0.3}px) scale(0.75)`;
  document.querySelector('.parallax-2').style.transform = `translateY(${scrollY * 0.6}px) scale(0.50)`;
});

//#endregion
});