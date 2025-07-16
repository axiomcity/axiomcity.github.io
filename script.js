// Fichier script.js HUB DAVID BERGER - AXCIT

// Déclarer les variables
const slurp = document.getElementById('slurp');
const slurp_numb = document.getElementById('slurp_numb');
const burger = document.getElementById("burger");
const burger2 = document.getElementById("burger2");
const accessibility = document.getElementById('accessibility');
const site = document.getElementById('site');

// Define localStorages Cookies
site.style.filter = localStorage.getItem('style');

// Menu burger.
function ft_burger() {
    if (burger.style.display === "flex") {
        burger.style.display = "none";
    } else {
        burger.style.display = "flex";
        burger.style.flexDirection = "column";
    }
}

// Menu burger 2.
function ft_burger2() {
    if (burger2.style.display === "flex") {
        burger2.style.display = "none";
    } else {
        burger2.style.display = "flex";
    }
}

// Affichage temps reel des valeurs des boutons.
document.addEventListener('DOMContentLoaded', () => {
    slurp_numb.textContent = slurp.value;

    slurp.addEventListener('input', () => {
        slurp_numb.textContent = slurp.value;
    });
});

// Fonction qui retourne le contraste de la page
function ft_contrast() {
    let c = slurp.value / 128;
    return c;
}

// Fonction qui gere l'apparition du bouton de fonctionnalité
function ft_accessibility () {
    if (accessibility.style.display === "block")
    {
        accessibility.style.display = "none";
    } else {
        accessibility.style.display = "block";
    }
}

// Fonction qui applique les couleurs au site.
function ft_setStyle (style) {
    switch (style.id) {
        case 'protanopie':
            site.style.filter = `hue-rotate(45deg) contrast(${ft_contrast()})`;
            break;
        case 'deuteranopie':
            site.style.filter = `hue-rotate(90deg) contrast(${ft_contrast()})`;
            break;
        case 'tritanopie':
            site.style.filter = `hue-rotate(180deg) contrast(${ft_contrast()})`;
            break;
        case 'achromatopsie':
            site.style.filter = `grayscale(1) contrast(${ft_contrast()})`;
            break;
        case 'remover':
            site.style.filter = `hue-rotate(0deg)`;
            break;
    }
    // Met a jour le Cookie d'accessiblité
    localStorage.setItem('style', site.style.filter);
}
