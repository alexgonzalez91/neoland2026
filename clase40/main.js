const menuBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    // Alternamos la clase 'active' para mostrar/ocultar
    navLinks.classList.toggle('active');
    
    // Opcional: Animación básica de la hamburguesa
    menuBtn.classList.toggle('is-active');
});