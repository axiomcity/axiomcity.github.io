// Jeux Videos script.js
const lang_info = document.getElementById("lang-info");
const lang_select = document.getElementById("lang-select");
const vid_content = document.getElementById("vid-content");

// Check what language is used.
function vid_lang() {
    let language = lang_select.options[lang_select.selectedIndex];
    lang_info.innerHTML = language.innerHTML;

    // Charger la video sur la langue choisi dans le parametre du bouton select
    switch(language.value) {
        case "en":
            vid_content.src = "demo-en.mp4";break
        case "ru":
            vid_content.src = "demo-ru.mp4";break
        case "de":
            vid_content.src = "demo-de.mp4";break
        case "fr":
            vid_content.src = "demo-fr.mp4";break
    }
    console.log("select : ", language.value, language.innerHTML, vid_content.src);
}
