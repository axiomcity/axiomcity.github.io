const slurp = document.getElementById('slurp');
const slurp_numb = document.getElementById('slurp_numb');
const links = document.querySelector(".links");
const lang_info = document.getElementById("lang-info");
const lang_select = document.getElementById("lang-select");
const vid_content = document.getElementById("vid-content");
// Define localStorages Cookies
const site = document.getElementById('site');
site.style.filter = localStorage.getItem('style');
// ACCESS
const access = document.querySelector('.access');


function ft_access() { access.classList.toggle('access-hidden') }
function ft_links() { links.classList.toggle('hidden') }

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



// #############################
// LANGUES
// #############################
function vid_lang() {
    let language = lang_select.options[lang_select.selectedIndex];
    lang_info.innerHTML = language.innerHTML;

    // Charger la video sur la langue choisi dans le parametre du bouton select
    switch (language.value) {
        case "en":
            vid_content.src = "assets/img/videos/demo-en.mp4"; break
        case "ru":
            vid_content.src = "assets/img/videos/demo-ru.mp4"; break
        case "de":
            vid_content.src = "assets/img/videos/demo-de.mp4"; break
        case "fr":
            vid_content.src = "assets/img/videos/demo-fr.mp4"; break
    }
    console.log("select : ", language.value, language.innerHTML, vid_content.src);
}




// #############################
// LANGUES
// #############################
function ft_setStyle(style) {
    switch (style.id) {
        case 'protanopie':
            site.style.filter = `hue-rotate(45deg) contrast(${ft_contrast() + .1})`;
            break;
        case 'deuteranopie':
            site.style.filter = `hue-rotate(90deg) contrast(${ft_contrast() + .1})`;
            break;
        case 'tritanopie':
            site.style.filter = `hue-rotate(180deg) contrast(${ft_contrast() + .1})`;
            break;
        case 'achromatopsie':
            site.style.filter = `grayscale(1) contrast(${ft_contrast() + .1})`;
            break;
        case 'remover':
            site.style.filter = `hue-rotate(0deg)`;
            break;
    }
    // Met a jour le Cookie d'accessiblité
    localStorage.setItem('style', site.style.filter);
}





// SEARCH API
search = document.getElementById('search');

search.addEventListener('input', () => {
    query = search.value
    searchArticles(query);
});

async function searchArticles(query) {
    if (!query) return;

    try {
        const response = await fetch(`http://localhost:3000/article=${(query)}`);
        console.log("requete = ", query, "reponse = ", response)
        if (!response.ok) {
            throw new Error('Erreur de réseau');
        }
        const articles = await response.json();
        const Result = document.querySelector(".cont-result");

        Result.innerHTML = '';

        articles.forEach(article => {
            const li = document.createElement('li');
            li.textContent = article.title;
            Result.appendChild(li);
        });
    } catch (error) {
        console.error('Erreur:', error);
        Result.innerHTML = '<p>Erreur lors de la récupération des articles.</p>';
    }
}
