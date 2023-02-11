import { recipes } from "./data/recipes.js";
import { totalIngredients,totalAppliances,totalUstensils } from "./data/elementRecipes.js";
const ingredientsUl = document.getElementById("ingredients-list");
const appareilsUl = document.getElementById("appareils-list");
const ustensilsUl = document.getElementById("ustensiles-list");
const appareilsChevron = document.getElementById("appareils-chevron");
const ustensilsChevron = document.getElementById("ustensiles-chevron");
const ingredientsChevron = document.getElementById("ingredients-chevron");
const cssmodif = document.querySelectorAll(".advanced-search-btn");
const appareilsInput = document.getElementById("appareils");
const ustensilsInput = document.getElementById("ustensiles");
const ingredientsInput = document.getElementById("ingredients");
const mainSearchinput = document.getElementById("main-search");
const recipesSection = document.querySelector("#recipes-container");
let tagArrayselected = [];
let repetitionIngredients = [];
let filterrecipes = [];
let newfilterrecipes = [];

/**
 *
 * @param {*} recipes
 */
async function displayRecipes(recipes) {
  recipesSection.innerHTML = "";
  recipes.forEach((item) => {
    const recipeTemplate = recipesFactory(item);
    const recipeDom = recipeTemplate.getRecipesDOM();
    recipesSection.appendChild(recipeDom);
  });
}

/**
 *  Advanced Filter EventListener
 */
ingredientsChevron.addEventListener("click", (e) => {
  if (cssmodif[0].classList.contains("active")) {
    closeList(cssmodif[0]);
    ingredientsInput.placeholder = `Ingrédients`;
    ingredientsChevron.classList.remove("active");
  } else {
    openList(cssmodif[0]);
    ingredientsInput.placeholder = `Rechercher un ingrédient`;
    ingredientsChevron.classList.add("active");
    closeList(cssmodif[1]);
    appareilsInput.placeholder = `Appareil`;
    closeList(cssmodif[2]);
    ustensilsInput.placeholder = `Ustensiles`;
  }
});

appareilsChevron.addEventListener("click", (e) => {
  if (cssmodif[1].classList.contains("active")) {
    closeList(cssmodif[1]);
    appareilsInput.placeholder = `Appareils`;
    appareilsChevron.classList.remove("active");
  } else {
    openList(cssmodif[1]);
    appareilsInput.placeholder = `Rechercher un appareil`;
    appareilsChevron.classList.add("active");
    closeList(cssmodif[0]);
    ingredientsInput.placeholder = `Ingrédients`;
    closeList(cssmodif[2]);
    ustensilsInput.placeholder = `Ustensiles`;
  }
});

ustensilsChevron.addEventListener("click", () => {
  if (cssmodif[2].classList.contains("active")) {
    closeList(cssmodif[2]);
    ustensilsInput.placeholder = `Ustensiles`;
    ustensilsChevron.classList.remove("active");
  } else {
    openList(cssmodif[2]);
    ustensilsInput.placeholder = `Rechercher un ustensile`;
    ustensilsChevron.classList.add("active");
    closeList(cssmodif[0]);
    ingredientsInput.placeholder = `Ingrédients`;
    closeList(cssmodif[1]);
    appareilsInput.placeholder = `Appareils`;
  }
});

/**
 * Viewing search filters
 * @param {array} recipes
 */
function displayIngredients(recipes) {
  let array = [];
  let ingredientsItem = [];
  ingredientsUl.innerHTML = "";
  for (let i = 0; i < recipes.length; i++) {
    array.push(recipes[i].ingredients);
  }
  //we go through the list of ingredients to retrieve each ingredient one by one and insert it into the list
  for (let el in array) {
    for (let j = 0; j < array[el].length; j++) {
      try {
        let items = array[el][j].ingredient;
        ingredientsItem.push(items.toLowerCase());
      } catch (error) {
        console.log("pos : " + el + "/" + j);
        console.log(array[el][j]);
      }
      
    }
  }
  // we check if there are duplicates so that they only appear once
  repetitionIngredients = ingredientsItem
    .filter((item, index) => ingredientsItem.indexOf(item) === index)
    .sort();

  for (let l = 0; l < repetitionIngredients.length; l++) {
    ingredientsUl.innerHTML += `<li class="item ingredients-result" data-value='${repetitionIngredients[l]}'>${repetitionIngredients[l]}</li>`;
  }
}

function displayAppareils(recipes) {
  let appareilsItems = [];
  appareilsUl.innerHTML = "";
  for (let i = 0; i < recipes.length; i++) {
    appareilsItems.push(recipes[i].appliance.toLowerCase());
  }
  let repetitionAppareils = appareilsItems
    .filter((item, index) => appareilsItems.indexOf(item) === index)
    .sort();
  for (let j = 0; j < repetitionAppareils.length; j++) {
    appareilsUl.innerHTML += `<li class="item appareils-result" data-value="${repetitionAppareils[j]}" >${repetitionAppareils[j]}</li>`;
  }
}

function displayUstensils(recipes) {
  let array = [];
  let ustensilsItem = [];
  ustensilsUl.innerHTML = "";
  for (let k = 0; k < recipes.length; k++) {
    array.push(recipes[k].ustensils);
  }
  for (let el in array) {
    for (let j = 0; j < array[el].length; j++) {
      let items = array[el][j];
      ustensilsItem.push(items.toLowerCase());
    }
  }

  let repetitionUstensils = ustensilsItem
    .filter((item, index) => ustensilsItem.indexOf(item) === index)
    .sort();
  for (let l = 0; l < repetitionUstensils.length; l++) {
    ustensilsUl.innerHTML += `<li class="item ustensils-result" data-value='${repetitionUstensils[l]}'>${repetitionUstensils[l]}</li>`;
  }
}

// scrolling control of the list of search filters
function openList(cssmodif) {
  cssmodif.classList.add("active");
}

function closeList(cssmodif) {
  cssmodif.classList.remove("active");
}

/**
 * 
updated recipes and search filter lists
 * @param {array} items 
 */
function updatemedia(items) {
  displayRecipes(items);
  displayIngredients(items);
  displayAppareils(items);
  displayUstensils(items);
  addTagIngredient();
  addTagappareil();
  addTagustensil();
  closeTag();
}

// management of tags by search filter

function addTagIngredient() {
  const ingredientsResult = document.querySelectorAll(".ingredients-result"); // Ingrédients de la liste
  for (let i = 0; i < ingredientsResult.length; i++) {
    ingredientsResult[i].addEventListener("click", addIngredient);
  }
}

function addTagappareil() {
  const appareilsResult = document.querySelectorAll(".appareils-result"); // Ingrédients de la liste
  for (let i = 0; i < appareilsResult.length; i++) {
    appareilsResult[i].addEventListener("click", addAppareil);
  }
}

function addTagustensil() {
  const ustensilsResult = document.querySelectorAll(".ustensils-result"); // Ingrédients de la liste
  for (let i = 0; i < ustensilsResult.length; i++) {
    ustensilsResult[i].addEventListener("click", addustensils);
  }
}

/**
 *
 * @param {string} ingredientEvent
 */
function addIngredient(ingredientEvent) {
  let itemsSelected = ingredientEvent.target.innerText;
  if (!tagArrayselected.includes(itemsSelected)) {  
  const searchTag = document.querySelector("#search-tag");
  let tagContainer = document.createElement("div");
  tagContainer.innerHTML = "";
  tagContainer.classList.add("ingredients-inlinetag");
  tagContainer.classList.add("active");
  tagContainer.innerHTML = `<div class='items-ingredients tag'>${itemsSelected}</div> <i class="far fa-times-circle close-button"></i>`;
  searchTag.appendChild(tagContainer);
  closeList(cssmodif[0]);

  tagArrayselected.push(itemsSelected);

  const array = filterrecipes.length == 0 ? recipes : filterrecipes;
  // condition ? expression_1 : expression_2; If filterrecipes is equal to zero we use the basic recipes table otherwise we retrieve the data from the filterrecipes table

  filterrecipes = array.filter((recipe) => {
    return recipe.ingredients.some((el) =>
      uniformString(el.ingredient).includes(itemsSelected)
    );
  });
  updatemedia(filterrecipes);
  ingredientsInput.placeholder = `Ingrédients`;
  }
}

/**
 *
 * @param {string} appareilEvent
 */
function addAppareil(appareilEvent) {
  let itemsSelected = appareilEvent.target.innerText;
  if (!tagArrayselected.includes(itemsSelected)) {  
  const searchTag = document.querySelector("#search-tag");
  let tagsContainer = document.createElement("div");
  tagsContainer.innerHTML = "";
  tagsContainer.classList.add("appareils-inlinetag");
  tagsContainer.classList.add("active");
  tagsContainer.innerHTML = `<div class='items-appareils tag'>${itemsSelected}</div> <i class="far fa-times-circle close-button"></i>`;
  searchTag.appendChild(tagsContainer);
  closeList(cssmodif[1]);

  tagArrayselected.push(itemsSelected);

  const array = filterrecipes.length == 0 ? recipes : filterrecipes;

  filterrecipes = array.filter((recipe) => {
    return uniformString(recipe.appliance).includes(itemsSelected);
  });

  updatemedia(filterrecipes);
  appareilsInput.placeholder = `Appareils`;
}
}

/**
 *
 * @param {string} ustensilsEvent
 */
function addustensils(ustensilsEvent) {
  let itemsSelected = ustensilsEvent.target.innerText;
  if (!tagArrayselected.includes(itemsSelected)) {  
  const searchTag = document.querySelector("#search-tag");
  let tagsContainers = document.createElement("div");
  tagsContainers.innerHTML = "";
  tagsContainers.classList.add("ustensils-inlinetag");
  tagsContainers.classList.add("active");
  tagsContainers.innerHTML = `<div class='items-ustensils tag'>${itemsSelected}</div> <i class="far fa-times-circle close-button"></i>`;
  searchTag.appendChild(tagsContainers);
  closeList(cssmodif[2]);

  tagArrayselected.push(itemsSelected);

  const array = filterrecipes.length == 0 ? recipes : filterrecipes;

  filterrecipes = array.filter((recipe) => {
    return recipe.ustensils.some((el) =>
      uniformString(el).includes(itemsSelected)
    );
  });
  updatemedia(filterrecipes);
  ustensilsInput.placeholder = `Ustensiles`;
}
}

// functions to remove tags
function closeTag() {
  const closeTags = document.querySelectorAll(".close-button");
  for (let i = 0; i < closeTags.length; i++) {
    const element = closeTags[i];
    element.addEventListener("click", RemoveClassActive);
  }
}

/**
 * remove selected tags, and update recipes
 * @param {button} button
 */
function RemoveClassActive(button) {
  let btnclose = button.target;
  btnclose.parentElement.classList.remove("active");
  let item = btnclose.previousElementSibling.innerHTML;
  tagArrayselected = tagArrayselected.filter((tag) => tag != item);
  //console.log(tagArrayselected);
  if (tagArrayselected.length === 0) {
    filterrecipes = recipes;
  } else {
    filterrecipes = filterTools(recipes, tagArrayselected);
  }  
  updatemedia(filterrecipes);
}


function filterTools(recipesDetails, toolsSelected) {
  console.log(totalIngredients);
  let appareils = toolsSelected.filter(tool => {
    return totalAppliances.includes(uniformString(tool));
  });
  
  let ingredients = toolsSelected.filter(tool => {
    return totalIngredients.filter(s => s.includes(uniformString(tool))).length > 0;
  });
 
  let ustensils = toolsSelected.filter(tool => {
    return totalUstensils.includes(uniformString(tool)); 
  });
   
  return recipesDetails
    .filter(recipe => filterIngredient(recipe, ingredients))
    .filter(recipe => filterUstensil(recipe, ustensils)) 
    .filter(recipe => filterAppliance(recipe, appareils));
   
       
}

  
function filterAppliance(recipe, appliances) {
  if ( appliances.length === 0 ) {
    return true;
  }
  return appliances.includes(uniformString(recipe.appliance)); 
}


function filterIngredient(recipe, ingredients) {
  
  if ( ingredients.length === 0 ) {
    return true;
  }
  let ingredientsRecipe = recipe.ingredients.map(i => i.ingredient).map((i) => uniformString(i));

  return intersection(ingredientsRecipe, ingredients).length > 0;
  
}

function filterUstensil(recipe, ustensils) {
  
  if (ustensils.length === 0 ) {
    return true;
   
  }
  let ustensilesRecipe = recipe.ustensils.map((i) => uniformString(i));
  return intersection(ustensilesRecipe, ustensils).length > 0;
}

function intersection (list1, list2) {
  return list1.filter(value => list2.filter(v2 => value.includes(v2)).length > 0);
}

function searchIngredient() {
  ingredientsInput.addEventListener("keyup", (e) => {
    openList(cssmodif[0]);
    ingredientsInput.placeholder = `Rechercher un ingrédient`;
    let ingredientString = uniformString(e.target.value);
    const array = filterrecipes.length == 0 ? recipes : filterrecipes;
    if (ingredientString.length >= 3) {
      filterrecipes = array.filter((recipe) => {
        return recipe.ingredients.some((el) =>
          uniformString(el.ingredient).includes(ingredientString)
        );
      });
      updatemedia(filterrecipes);
      ingredientsInput.placeholder = `Ingrédients`;
      console.log(filterrecipes);
    }
  });
}

function searchAppareils() {
  appareilsInput.addEventListener("keyup", (e) => {
    openList(cssmodif[1]);
    ingredientsInput.placeholder = `Rechercher un ingrédient`;
    let appareilsString = uniformString(e.target.value);
    const array = filterrecipes.length == 0 ? recipes : filterrecipes;
    if (appareilsString.length >= 3) {
      filterrecipes = array.filter((recipe) => {
        return uniformString(recipe.appliance).includes(appareilsString);
      });
      updatemedia(filterrecipes);
      appareilsInput.placeholder = `Appareils`;
      console.log(filterrecipes);
    }
  });
}

function searchUstensils() {
  ustensilsInput.addEventListener("keyup", (e) => {
    openList(cssmodif[2]);
    ingredientsInput.placeholder = `Rechercher un ingrédient`;
    let ustensilsString = uniformString(e.target.value);
    const array = filterrecipes.length == 0 ? recipes : filterrecipes;
    if (ustensilsString.length >= 3) {
      filterrecipes = array.filter((recipe) => {
        return recipe.ustensils.some((el) =>
          uniformString(el).includes(ustensilsString)
        );
      });
      updatemedia(filterrecipes);
      ustensilsInput.placeholder = `Ustensils`;
      console.log(filterrecipes);
    }
  });
}

//main search function, with or without tag;
function searchMainBar() {
  mainSearchinput.addEventListener("keyup", (e) => {
    let filteredGlobal = [];
    const searchString = uniformString(e.target.value);
    
    if (searchString.length >= 3) {
      if (tagArrayselected.length != 0) {
        filteredGlobal = filterrecipes.filter((recipe) => {
          return (
            uniformString(recipe.name).includes(searchString) ||
            uniformString(recipe.description)
              
              .includes(searchString) ||
            recipe.ingredients.some((el) =>
              uniformString(el.ingredient).includes(searchString)
            )
          );
        });
        updatemedia(filteredGlobal);
      }
      if (tagArrayselected.length === 0) {
        console.time();

        //algo alternatif
        for (let i = 0; i < recipes.length; i++) {
          const { name, ingredients, description } = recipes[i];
          const namerecipe = uniformString(name)            
            .includes(searchString);
          const descriptionrecipe = uniformString(description)            
            .includes(searchString);
          let ingredientrecipe = false;
          for (let y = 0; y < ingredients.length; y++) {
            if (
              uniformString(ingredients[y].ingredient)                
                .includes(searchString)
            ) {
              ingredientrecipe = true;
            }
          }
          if (namerecipe || descriptionrecipe || ingredientrecipe) {
            filteredGlobal.push(recipes[i]);
          } else {
            recipesSection.innerHTML = `Aucune recette ne correspond à votre critère... Vous pouvez chercher  « tarte aux pommes », « poisson », etc.`;
          }
        }

        // filteredGlobal = recipes.filter((recipe) => {
        //     return (uniformString(recipe.name).toLowerCase().includes(searchString) || uniformString(recipe.description).toLowerCase().includes(searchString) ||
        //         recipe.ingredients.some((el) => uniformString(el.ingredient).includes(searchString)));
        // });

        console.timeEnd();

        console.log(filteredGlobal);
        updatemedia(filteredGlobal);
      }
      if (filteredGlobal.length === 0) {
        recipesSection.innerHTML = `Aucune recette ne correspond à votre critère... Vous pouvez chercher  « tarte aux pommes », « poisson », etc.`;
      }
    } else {
      if (searchString.length === 0 && tagArrayselected.length === 0) {
        updatemedia(recipes);
      }
    }
  });
}

//font normalization function
function uniformString(string) {
  string = string.normalize("NFC").replace(/[\u0300-\u036f]/g, "");
  string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  string = string.toLowerCase();

  string = string.replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/[']/g, " ");
  return string;
}

async function init() {
  displayRecipes(recipes);
  displayAppareils(recipes);
  displayUstensils(recipes);
  displayIngredients(recipes);
  searchIngredient();
  searchAppareils();
  searchUstensils();
  addTagIngredient();
  addTagappareil();
  addTagustensil();
  searchMainBar();
}
init();
