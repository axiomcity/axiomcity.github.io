// Trip with friend JS for gallery and elements.

// déclarer les variables
const halo  = document.querySelector('#halo');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const disp = document.querySelector('#disp');
let i = 0;
let d = 10;

// Déclarer le tableau d'iamges.
images = [
    "trip_01.jpeg",
    "trip_02.jpeg",
    "trip_03.jpeg",
    "trip_04.jpeg",
    "trip_05.jpeg",
    "trip_06.jpeg",
    "trip_07.jpeg",
    "trip_08.jpeg",
    "trip_09.jpeg",
    "trip_10.jpeg",
    "Voici la photo de vacances numero 1",
    "Voici la photo de vacances numero 2",
    "Voici la photo de vacances numero 3",
    "Voici la photo de vacances numero 4",
    "Voici la photo de vacances numero 5",
    "Voici la photo de vacances numero 6",
    "Voici la photo de vacances numero 7",
    "Voici la photo de vacances numero 8",
    "Voici la photo de vacances numero 9",
    "Voici la photo de vacances numero 10"
]



// Halo description des images.

// Event listner des fleches gauche et droite.
btn1.addEventListener('click', (e) => {
    e.preventDefault();
    if (i<0) {i=9}
    disp.src = `assets/trip/${images[i]}`;
    console.log(disp.src, halo.textContent);
});

btn2.addEventListener('click', (e) => {
    e.preventDefault();
    if (i>9) {i = 0}
    i = i + 1;
    d = d + 1;
    disp.src = `assets/trip/${images[i]}`;
    halo.textContent = images[d];
    console.log(disp.src, halo.textContent);
});

