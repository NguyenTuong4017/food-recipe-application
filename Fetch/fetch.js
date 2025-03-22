import { API_KEY } from "@env";

export async function fetchRecipe(type, maxReadyTime) {
  const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=all&type=${type}&addRecipeInformation=true&maxReadyTime=${maxReadyTime}&offset=4&number=50`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": `${API_KEY}`,
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function fetchRecipeInfo(recipeId) {
  const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": `${API_KEY}`,
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}
