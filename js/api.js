const api= axios.create({
    baseURL : "https://dummyjson.com",
    timeout : 5000
})

//fonction pour recuperer les recettes depuis l'API et retourner les donnees.

export async function getRecipes(){
    try{
        const response = await api.get(
            "/recipes?limit=15"
        );
        return response.data;
    } catch (error){
        console.log(error);
        throw error;
        
    }
}

// fonction pour faire la recherche sur les recette
export async function searchRecipes(keyword) {
    try{
        const response = await api.get("/recipes/search", {
            params: {q: keyword }
        });
        return response.data;
    }catch (error){
        throw error;
        

    }
    
}

// fonction pour ajouter un recette sur api 
export async function ajouterRecette(nouvelleRecette) {
    
    const response = await api.post("/recipes/add", nouvelleRecette);
    return response.data;
}

