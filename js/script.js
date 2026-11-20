import { getRecipes, searchRecipes, ajouterRecette, supprimeRecette } from './api.js';
import { displayRecipes, createRecipeCard } from './affichage.js';
import { validerNom, validerCuisine, validerDifficulte, validerTemps } from './validation.js';

async function initRecipes() {
    msg_erreur.classList.add("hidden");
    try {
        const data = await getRecipes();
        // console.log(data)
        displayRecipes(data.recipes);

    }catch(error){
        console.log("erreur", error)
        msg_erreur.textContent = "une erreur est survenue. reessayez.";
        msg_erreur.classList.remove("hidden");

    }
    
}
// initRecipes()

const barr_search = document.querySelector(".barr-search");
const inputSearch = document.querySelector(".input-search");
const btn_search = document.querySelector("#btn-search");
const msg_loading = document.querySelector("#msg-loading")
const msg_erreur = document.querySelector("#msg-erreur")
const btn_reessayer = document.querySelector("#btn-reessayer")
const recipesContainer = document.querySelector("#recipes-container");

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
    msg_loading.classList.remove("hidden");

    try {
        const dataRecette = await searchRecipes(searchRecette);
        if (!dataRecette.recipes || dataRecette.recipes.length === 0) {
            msg_erreur.textContent = "recette introuvable";
            msg_erreur.classList.remove("hidden");
            displayRecipes([]);
            btnRoutesRecettes.classList.remove("hidden");
            return;
        }
        btnRoutesRecettes.classList.add("hidden");
        // Afficher les resultats
        displayRecipes(dataRecette.recipes);

    } catch (error) {
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
btnRoutesRecettes.addEventListener("click", function () {
    initRecipes();
    msg_erreur.classList.add("hidden");
    btnRoutesRecettes.classList.add("hidden");
})

// pour ajouter un recette sur le formulaire 

const recette_ajouter = document.querySelector("#recette-ajouter")
const nom_Rectte = document.querySelector("#nom");
const cuisine = document.querySelector("#cuisine");
const difficulte = document.querySelector("#difficulte");
const temps = document.querySelector("#temps");
const btnAjouter = document.querySelector("#btn-ajouter");
// console.log(recette_ajouter, nom_Rectte, cuisine, difficulte, temps, btnAjouter);

// msg d'erreur
const erreur_nom = document.querySelector("#erreur-nom");
const erreur_cuisine = document.querySelector("#erreur-cuisine");
const erreur_difficulte = document.querySelector("#erreur-difficulte");
const erreur_temps = document.querySelector("#erreur-temps");

//affiche le popup de msg succes
const popupSucces = document.querySelector("#popup-succes");
const btnFermer = document.querySelector("#btn-fermer");

const popupErreur = document.querySelector("#popup-erreur")
const btnFermerErr = document.querySelector("#btn-fermerErr")

recette_ajouter.addEventListener("submit", async function (event) {
    event.preventDefault()
    let formulaireValide = true;
    erreur_nom.classList.add("hidden");
    if (!validerNom(nom_Rectte.value)) {
        erreur_nom.textContent = "Le nom doit contenir entre 3 et 60 caractères";
        erreur_nom.classList.remove("hidden");
        formulaireValide = false
    }

    erreur_cuisine.classList.add("hidden");
    if (!validerCuisine(cuisine.value)) {
        erreur_cuisine.textContent = "veuillez saisir la cuissine ex: italie ... ";
        erreur_cuisine.classList.remove("hidden");
        formulaireValide = false;
    }

    erreur_difficulte.classList.add("hidden");
    if (!validerDifficulte(difficulte.value)) {
        erreur_difficulte.textContent = "veuillez choisir la difficulte :Easy, Medium, hard  ";
        erreur_difficulte.classList.remove("hidden");
        formulaireValide = false;
    }

    erreur_temps.classList.add("hidden");
    if (!validerTemps(temps.value)) {
        erreur_temps.textContent = "veuillez entre le temps enter 1 et 300 minutes. ";
        erreur_temps.classList.remove("hidden");
        formulaireValide = false;
    }
    if (!formulaireValide) {
        return;
    }

    const nouvelleRecette = {
        name: nom_Rectte.value,
        cuisine: cuisine.value,
        difficulty: difficulte.value,
        prepTimeMinutes: Number(temps.value)
    }
    // masque le popup erreur avant chaque essai
    popupErreur.classList.add("hidden");

    try {
        btnAjouter.disabled = true
        // pour envoyer le nouvel recette a l'api
        const recette = await ajouterRecette(nouvelleRecette)
        // console.log(recette);

        // cree carte 
        const nouvelleCarte = createRecipeCard(recette);

        // ajouter le nouvel recette 
        recipesContainer.prepend(nouvelleCarte);

        popupSucces.classList.remove("hidden");

        // pour reset du formulaire
        recette_ajouter.reset()

    } catch (error) {
        console.log("Erreur", error);
        popupErreur.classList.remove("hidden");


    } finally {
        btnAjouter.disabled = false
    }


})

btnFermer.addEventListener("click", function () {
    popupSucces.classList.add("hidden")
})

btnFermerErr.addEventListener("click", function () {
    popupErreur.classList.add("hidden");
})

const popupSupprimer = document.querySelector("#popup-supprimer");
const btnAnnuler = document.querySelector("#btn-Annuler");
const btnConfirme = document.querySelector("#btn-confirmer");
//pour enregisster l'id et la carte pour la recette qui on a choisir pour supprime
let recetteSelectionnee = null;
let carteSelectionnee = null;

recipesContainer.addEventListener("click", function(event){
    const btn = event.target.closest(".btn-supprimer");
    if(!btn){
        return;
    }
    recetteSelectionnee = btn.dataset.id;

    carteSelectionnee = btn.closest("article"); 

    popupSupprimer.classList.remove("hidden")

})


btnAnnuler.addEventListener("click", function () {
    popupSupprimer.classList.add("hidden");
    recetteSelectionnee = null;
    carteSelectionnee = null;
});
const recipesCount = document.querySelector("#recipes-count");

//affiche le popup de msg supprime
const popupSuccesSupprime = document.querySelector("#popup-succesSupprime");
const btnFermeSup = document.querySelector("#btn-fermeSup");
const popupErreurSupprime = document.querySelector("#popup-erreurSupprime")
const btnFermerErrSup = document.querySelector("#btn-fermerErrSup")

popupErreurSupprime.classList.add("hidden");
btnConfirme.addEventListener("click", async function () {
    try{
        const response = await supprimeRecette(recetteSelectionnee);
        carteSelectionnee.remove();
        recipesCount.textContent = Number(recipesCount.textContent) - 1;
        popupSupprimer.classList.add("hidden");

        // efficher le popup de succes
        popupSuccesSupprime.classList.remove("hidden");

         // reinitialiser les variables
        recetteSelectionnee = null;
        carteSelectionnee = null;


    }catch(error){
        console.log("Erreur suppression", error);

        // fermer le popup de confirmation
        popupSupprimer.classList.add("hidden");
    } finally {
        btnConfirme.disabled = false;
    }
    


});
// fermer le popup de succès
btnFermeSup.addEventListener("click", function () {
    popupSuccesSupprime.classList.add("hidden");
});

// fermer le popup d'erreur
btnFermerErrSup.addEventListener("click", function () {
    popupErreurSupprime.classList.add("hidden");
});
initRecipes()




