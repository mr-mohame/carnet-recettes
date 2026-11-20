// function pour valide le nom 
export function validerNom(nom){
    const nomValid = nom.trim()
    const regex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    if(nomValid.length < 3 || nomValid.length > 60 || !regex.test(nomValid)){
        return false
    }else{
        return true
    }
}

// function pour valide la Cuisine
export function validerCuisine(cuisine){
    const cuisineValid = cuisine.trim()
    const regex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    if(cuisineValid === "" || !regex.test(cuisineValid)){
        return false
    }else{
        return true
    }
}

// function pour valide la difficulte
export function validerDifficulte(difficulte){
    if(difficulte === "Easy" || difficulte === "Medium" || difficulte === "Hard"){
        return true
    }else{
        return false
    }
}

// function pour valide le temps
export function validerTemps(temps){
    const tempsValid = Number(temps);
    // isFinite verifie cest le num est vrai or no  il return true cest le num est pas vrai et return false cest le num est vrai.
    if(temps.trim() === "" || !Number.isFinite(tempsValid) || tempsValid < 1 || tempsValid > 300){
        return false
    }else{
        return true
    }
}
