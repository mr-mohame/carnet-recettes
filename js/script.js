import { getRecipes, searchRecipes } from './api.js';
import { displayRecipes } from './affichage.js';

async function initRecipes() {
    const data = await getRecipes();
    // console.log(data)

    displayRecipes(data.recipes);
}
initRecipes()


const barr_search = document.querySelector(".barr-search");
const inputSearch = document.querySelector(".input-search");
const btn_search = document.querySelector("#btn-search");
const msg_loading = document.querySelector("#msg-loading")
const msg_erreur = document.querySelector("#msg-erreur")
const btn_reessayer = document.querySelector("#btn-reessayer")

// console.log(barr_search, inputSearch, btn_search);
let derniereSearch = "";
barr_search.addEventListener("submit", async function (event) {
    event.preventDefault();
    const searchRecette = inputSearch.value.trim();
    if (searchRecette === "") {
        alert("saisir une plats");
        return;
    }

    // Enregistrer la dernière recherche
    derniereSearch = searchRecette;


    // cache lencien msg
    msg_erreur.classList.add("hidden");
    btn_reessayer.classList.add("hidden");
    // afficher le chargemenet 
    msg_loading.classList.add("hidden");

    try {
        const dataRecette = await searchRecipes(searchRecette);
        if (!dataRecette.recipes || dataRecette.recipes.length === 0) {
            msg_erreur.textContent = "recette introuvable";
            msg_erreur.classList.remove("hidden");
            displayRecipes([]);
            btnRoutesRecettes.classList.remove("hidden");
            return;
        }
        // Afficher les resultats
        displayRecipes(dataRecette.recipes);

    }catch(error){
        console.error(error);

        displayRecipes([]);

        msg_erreur.textContent = "une erreur est survenue. reessayez.";
        msg_erreur.classList.remove("hidden");

        // Afficher le bouton Réessayer
        btn_reessayer.classList.remove("hidden");

    } finally {
        // cacher le chargement dans tous les cas
        msg_loading.classList.add("hidden");
    }
    
})
// pour affiche le btn ressaayer 
btn_reessayer.addEventListener("click", function () {
    inputSearch.value = derniereSearch;
    barr_search.requestSubmit();
});
// pour reccuper les auncien recette 
inputSearch.addEventListener("input", function () {
    if (inputSearch.value.trim() === "") {
        initRecipes();
    }
});
// pour afficher la btn voir toutes les recettes
const btnRoutesRecettes = document.querySelector("#btn-toutes-recettes");
btnRoutesRecettes.addEventListener("click", function(){
    initRecipes();
    msg_erreur.classList.add("hidden");
    btnRoutesRecettes.classList.add("hidden");
})


