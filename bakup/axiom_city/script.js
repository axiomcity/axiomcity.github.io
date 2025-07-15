// Fichier script.js HUB DAVID BERGER - AXCIT

const contrast_range = document.getElementById('contrast_range');
const contrast_value = document.getElementById('contrast_value');
const color_range = document.getElementById('color_range');
const color_value = document.getElementById('color_value');
const other_range = document.getElementById('other_range');
const other_value = document.getElementById('other_value');
const burger = document.getElementById("burger");
const burger2 = document.getElementById("burger2");
const accessibility = document.getElementById('accessibility');
const site = document.getElementById('site');

// Menu burger.
function burger() {
    if (burger.style.display === "flex") {
        burger.style.display = "none";
    } else {
        burger.style.display = "flex";
        burger.style.flexDirection = "column";
    }
}

// Menu burger 2.
function burger2() {
    if (burger2.style.display === "flex") {
        burger2.style.display = "none";
    } else {
        burger2.style.display = "flex";
    }
}


// Affichage temps reel des valeurs des boutons.
document.addEventListener('DOMContentLoaded', () => {
    contrast_value.textContent = contrast_range.value;
    color_value.textContent = color_range.value;
    other_value.textContent = other_range.value;

    contrast_range.addEventListener('input', () => {
        let currentContrast = contrast_range.value;
        contrast_value.textContent = currentContrast;
    });
    color_range.addEventListener('input', () => {
        let currentColor = color_range.value;
        color_value.textContent = currentColor;
    });
    other_range.addEventListener('input', () => {
        let currentOther = other_range.value;
        other_value.textContent = currentOther;
    });
});

function ft_accessibility () {
    if (accessibility.style.display === "block")
    {
        accessibility.style.display = "none";
    } else {
        accessibility.style.display = "block";
    }
}

site.style.filter = localStorage.getItem('style');

function ft_setStyle (style) {

    switch (style.id) {
        case 'protanopie':
            site.style.filter = 'hue-rotate(45deg)';
            break;
        case 'deuteranopie':
            site.style.filter = 'hue-rotate(90deg)';
            break;
        case 'tritanopie':
            site.style.filter = 'hue-rotate(180deg)';
            break;
        case 'achromatopsie':
            site.style.filter = 'grayscale(1)';
            break;
        case 'remover':
            site.style.filter = 'hue-rotate(0deg)';
            break;
    }
    localStorage.setItem('style', site.style.filter);
}