// Fichier script.js HUB DAVID BERGER - AXCIT

const contrast_range = document.getElementById('contrast_range');
const contrast_value = document.getElementById('contrast_value');
const color_range = document.getElementById('color_range');
const color_value = document.getElementById('color_value');
const other_range = document.getElementById('other_range');
const other_value = document.getElementById('other_value');
const burger = document.getElementById("burger_links");
const burger2 = document.getElementById("news");
const menu_access = document.getElementById('menu_access');
const site = document.getElementById('site');

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


// Fonction de génération de liens parmi la liste dans la base de donnée.
function ft_randomlink () {
    let links= [
        'http://localhost/1',
        'http://localhost/2',
        'http://localhost/3',
        'http://localhost/4',
        'http://localhost/5'
    ];
    let random = Math.floor(Math.random() * links.length);
    let url = links[random];
    console.log(url, "on", links.length);
    window.location.href = url;
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
    if (menu_access.style.display === "block")
    {
        menu_access.style.display = "none";
    } else {
        menu_access.style.display = "block";
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