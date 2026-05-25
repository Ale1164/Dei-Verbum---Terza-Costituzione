const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

// Array contenente i 6 fogli del libro
const papers = [
    document.querySelector("#p1"),
    document.querySelector("#p2"),
    document.querySelector("#p3"),
    document.querySelector("#p4"),
    document.querySelector("#p5"),
    document.querySelector("#p6")
];

let currentSpread = 0; 
const maxSpread = papers.length;

// Funzione che accende le immagini solo sulle pagine attualmente visibili al lettore
function updateImagesVisibility() {
    // Nasconde istantaneamente tutte le immagini dei fogli mobili
    document.querySelectorAll('.paper img').forEach(img => {
        img.classList.remove('show-img');
    });

    // Se abbiamo sfogliato almeno un foglio, mostra l'immagine sul retro a sinistra
    if (currentSpread > 0) {
        const leftPageImg = papers[currentSpread - 1].querySelector('.back img');
        if (leftPageImg) leftPageImg.classList.add('show-img');
    }

    // Se non siamo alla fine, mostra l'immagine sul fronte a destra
    if (currentSpread < maxSpread) {
        const rightPageImg = papers[currentSpread].querySelector('.front img');
        if (rightPageImg) rightPageImg.classList.add('show-img');
    }
}

// Spegne immediatamente tutte le immagini durante il movimento del foglio
function hideImagesInstantly() {
    document.querySelectorAll('.paper img').forEach(img => {
        img.classList.remove('show-img');
    });
}

function goNextPage() {
    if (currentSpread < maxSpread) {
        hideImagesInstantly(); 
        papers[currentSpread].classList.add("flipped");
        currentSpread++;
        // Attende la fine della rotazione 3D (circa 750ms) per attivare il fade-in sfumato
        setTimeout(updateImagesVisibility, 750);
    }
}

function goPrevPage() {
    if (currentSpread > 0) {
        hideImagesInstantly(); 
        currentSpread--;
        papers[currentSpread].classList.remove("flipped");
        // Attende la fine della rotazione 3D (circa 750ms) per attivare il fade-in sfumato
        setTimeout(updateImagesVisibility, 750);
    }
}

// Listeners per i pulsanti inferiori
nextBtn.addEventListener("click", goNextPage);
prevBtn.addEventListener("click", goPrevPage);

// Gestione del clic diretto sulla pagina sinistra o destra del libro
papers.forEach((paper, index) => {
    paper.addEventListener("click", (e) => {
        // Se l'utente clicca su un eventuale link (tag A) nel testo, non sfogliare la pagina
        if (e.target.closest('.page-content') && e.target.tagName === 'A') return; 
        
        if (!paper.classList.contains("flipped") && index === currentSpread) {
            goNextPage();
        } else if (paper.classList.contains("flipped") && index === currentSpread - 1) {
            goPrevPage();
        }
    });
});

// Avvia il controllo visivo al primo caricamento del sito
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateImagesVisibility, 200);
});