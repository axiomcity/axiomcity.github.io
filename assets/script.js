// Fichier script.js HUB DAVID BERGER - AXCIT

// Déclarer les variables
const slurp = document.getElementById('slurp');
const slurp_numb = document.getElementById('slurp_numb');
const burger = document.getElementById("burger");
const burger2 = document.getElementById("burger2");
const accessibility = document.getElementById('accessibility');
const site = document.getElementById('site');


// #############################
// LANGUES
const lang_info = document.getElementById("lang-info");
const lang_select = document.getElementById("lang-select");
const vid_content = document.getElementById("vid-content");

function vid_lang() {
    let language = lang_select.options[lang_select.selectedIndex];
    lang_info.innerHTML = language.innerHTML;

    // Charger la video sur la langue choisi dans le parametre du bouton select
    switch(language.value) {
        case "en":
            vid_content.src = "assets/img/videos/demo-en.mp4";break
        case "ru":
            vid_content.src = "assets/img/videos/demo-ru.mp4";break
        case "de":
            vid_content.src = "assets/img/videos/demo-de.mp4";break
        case "fr":
            vid_content.src = "assets/img/videos/demo-fr.mp4";break
    }
    console.log("select : ", language.value, language.innerHTML, vid_content.src);
}


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

// SEARCH API
async function searchArticles() {
    const query = document.getElementById('search').value;
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = ''; // Vider les résultats précédents

    if (query.length === 0) return; // Ne rien faire si la requête est vide

    try {
        const response = await fetch(`http://localhost:3000/users?search=${query}`);
        if (!response.ok) {
            throw new Error('Erreur de réseau');
        }
        const articles = await response.json();
        
        articles.forEach(article => {
            // Créer un nouvel élément div pour chaque article
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';
            
            // Créer un lien
            const link = document.createElement('a');
            link.href = '/';  // Changez ceci pour le bon lien selon votre besoin
            
            // Créer l'image
            const img = document.createElement('img');
            img.src = 'assets/resulat_01.png';  // L'image de l'article
            img.alt = `Résultat ${article.id}`;  // Texte alternatif
            
            // Créer le paragraphe
            const paragraph = document.createElement('p');
            paragraph.textContent = article.name;  // Remplacer par le champ approprié
            
            // Construire la structure
            link.appendChild(img);
            resultDiv.appendChild(link);
            resultDiv.appendChild(paragraph);
            
            // Ajouter le nouveau div au conteneur des résultats
            resultsElement.appendChild(resultDiv);
        });
    } catch (error) {
        console.error('Erreur:', error);
        resultsElement.innerHTML = '<p>Erreur lors de la récupération des articles.</p>';
    }
}
