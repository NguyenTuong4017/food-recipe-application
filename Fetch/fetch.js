import { API_KEY } from "@env";

const API_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=500`;
export async function fetchRecipe() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Fetch error: " + response.statusText);
  }

  return await response.json();
}
