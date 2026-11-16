
export function createRecipeCard(recipe) {

    const article = document.createElement("article");
    article.classList.add("group", "bg-white", "rounded-xl", "overflow-hidden", "shadow-md", "hover:shadow-lg")

    const div = document.createElement("div")
    div.classList.add("relative", "overflow-hidden")

    const img = document.createElement("img");
    img.src = recipe.image;
    img.alt = recipe.name;
    img.loading = "lazy";
    img.classList.add("recipe-image", "w-full", "h-56", "object-cover", "group-hover:scale-105")

    const span = document.createElement("span")
    span.classList.add("absolute", "top-4", "left-4", "bg-[#FFFFFFF2]", "text-orange-600", "text-xs", "font-bold", "px-3", "py-2", "rounded-full")
    span.textContent = " 🍽️ Recette"

    div.appendChild(img)
    div.appendChild(span)
    article.appendChild(div)

    const recipe_div = document.createElement("div");
    recipe_div.classList.add("p-5")

    const recipe_name = document.createElement("h3");
    recipe_name.classList.add("recipe-name", "text-lg", "font-bold", "mb-4", "line-clamp-2");
    recipe_name.textContent = recipe.name;


    const divText = document.createElement("div");
    divText.classList.add("flex", "items-center", "justify-between", "text-sm", "mb-4");

    const span_Cuisine = document.createElement("span");
    span_Cuisine.classList.add("text-gray-400");
    span_Cuisine.textContent = recipe.cuisine;

    const span_recipeDifficulty = document.createElement("span");
    span_recipeDifficulty.classList.add("recipe-difficulty", "bg-[#fff7ed]", "text-[#ea580c]", "font-semibold", "px-3", "py-1", "rounded-full");
    span_recipeDifficulty.textContent = recipe.difficulty;

    const divPreparation = document.createElement("div")
    divPreparation.classList.add("flex", "items-center", "justify-between", "text-sm", "pt-4", "border-t", "border-gray-100")

    const spanPreparation = document.createElement("span");
    spanPreparation.classList.add("text-gray-400");
    spanPreparation.textContent = "⏱️ Préparation";

    const spanTime = document.createElement("span");
    spanTime.classList.add("recipe-time", "font-bold", "text-gray-800")
    spanTime.textContent = `${recipe.prepTimeMinutes} min`;

    // aajouter la cuisine et diffi dans le divText
    divText.appendChild(span_Cuisine);
    divText.appendChild(span_recipeDifficulty);

    // ajouter preparation et time dans la divPreparation
    divPreparation.appendChild(spanPreparation);
    divPreparation.appendChild(spanTime);

    // Ajouter les recipe_name et divText et divPreparation dans recipe_div
    recipe_div.appendChild(recipe_name);
    recipe_div.appendChild(divText);
    recipe_div.appendChild(divPreparation);

    // Ajouter recipe_div dans article
    article.appendChild(recipe_div);

    return article;
}

export function displayRecipes(recipes){
    const recipes_container = document.querySelector("#recipes-container")

    // pour affiche combien des recipes
    const recipes_count = document.querySelector("#recipes-count");
    recipes_count.textContent = recipes.length

    // Supprimer tous les anciens éléments
    recipes_container.replaceChildren();

    // boucle sur recipes 
    recipes.forEach(recipe => {

       const card = createRecipeCard(recipe)

       recipes_container.appendChild(card);
    });


}