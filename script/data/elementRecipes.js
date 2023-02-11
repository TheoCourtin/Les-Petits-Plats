import { recipes } from "./recipes.js";

export const totalIngredients = getIngredients();
export const totalAppliances = getAppliances();
export const totalUstensils = getUstensils();

function getIngredients() {
  return uniq(recipes
    .flatMap((recipe) => recipe.ingredients)
    .map((ingredient) => ingredient.ingredient)
    .map((i) => uniformString(i))
    .sort());
}
function getAppliances() {
  return uniq(recipes.map((recipe) => recipe.appliance).map((i) => uniformString(i))
  .sort());
}
function getUstensils() {
  return uniq(recipes
    .flatMap((recipe) => recipe.ustensils)
    .map((i) => uniformString(i))
    .sort());
}

function uniformString(string) {
  string = string.normalize("NFC").replace(/[\u0300-\u036f]/g, "");

  string = string.toLowerCase();

  string = string.replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/[']/g, " ");
  return string;
}

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}