import { getRecipes } from './api.js';
import { displayRecipes } from './affichage.js';

async function initRecipes(){
    const data = await getRecipes();
    // console.log(data)

    displayRecipes(data.recipes);
}
initRecipes()