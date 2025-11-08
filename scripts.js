// ===== DOM ELEMENTS =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const logoBtn = document.getElementById('logo-btn');
const themeBtn = document.getElementById('theme-btn');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const langOptions = document.querySelectorAll('.lang-option');
const langText = document.getElementById('lang-text');

// ===== THEME TOGGLE =====
const savedTheme = localStorage.getItem('theme') || 'dark';

function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        localStorage.setItem('theme', 'dark');
    }
}

setTheme(savedTheme);

themeBtn.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// ===== LANGUAGE SELECTOR =====
const savedLanguage = localStorage.getItem('language') || 'en';
let currentLanguage = savedLanguage;

// Traducciones (expandir según necesites)
const translations = {
    en: {
        'hero.title': 'Welcome to My Portfolio',
        'hero.description': 'This is where your content will be.',
        'nav.about': 'About',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',
    },
    es: {
        'hero.title': 'Bienvenido a Mi Portafolio',
        'hero.description': 'Aquí es donde irá tu contenido.',
        'nav.about': 'Acerca de',
        'nav.projects': 'Proyectos',
        'nav.contact': 'Contacto',
    }
};


// Función para actualizar idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    langText.textContent = lang.toUpperCase();

    // Actualiza todos los elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Actualiza clases activas en el dropdown
    langOptions.forEach(option => {
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });

    // Cierra el dropdown
    langDropdown.classList.remove('active');

    console.log(`Language changed to: ${lang}`);
}

// Inicia con el idioma guardado
changeLanguage(currentLanguage);

// Toggle dropdown
langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('active');
});

// Seleccionar idioma
langOptions.forEach(option => {
    option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        changeLanguage(lang);
    });
});

// Cierra el dropdown al hacer click fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-selector')) {
        langDropdown.classList.remove('active');
    }
});

// ===== HAMBURGER MENU =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== LOGO AS HOME BUTTON =====
logoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
});

// ===== PLACEHOLDER BUTTONS =====
document.getElementById('search-btn').addEventListener('click', () => {
    console.log('Search button clicked');
    alert(`Search feature coming soon! (${currentLanguage})`);
});

document.getElementById('volume-btn').addEventListener('click', () => {
    console.log('Volume button clicked');
    alert(`Volume feature coming soon! (${currentLanguage})`);
});

console.log("Language selector JavaScript is connected and working!");
