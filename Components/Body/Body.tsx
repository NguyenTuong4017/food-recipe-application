import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from "react";

import FilterButtons from "./BodyComponents/MainComponents/FilterButtons";

import FoodMenu from "./BodyComponents/MainComponents/RecipeMenu";
import { ActivityIndicator } from "react-native";

interface BodyProps {
  recipeFromSearchBar: Array<Object>;
}

export default function Body({ recipeFromSearchBar }: BodyProps) {
  const [allRecipes, setAllRecipes] = useState<Array<Object>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [recipeFromSearch, setRecipeFromSearch] = useState<
    Array<{ index: number }>
  >([]);

  const handleRecipesUpdate = (recipes: Array<Object>) => {
    setAllRecipes(recipes);
  };

  //Handle the loading progress
  const handleLoading = (loading: boolean) => {
    setLoading(loading);
  };

  //Because the object in the recipeFromSearchBar doesn't have index property, this function adds the index to them.
  const setIndexForRecipeFromSearchBar = () => {
    const updatedRecipes = recipeFromSearchBar.map((recipe, index) => ({
      ...recipe,
      index: index,
    }));

    setRecipeFromSearch(updatedRecipes);
  };

  //Reset the recipeFromSearchBar to empty when user clicks a filter button.
  const resetRecipeFromSearch = () => {
    setRecipeFromSearch([]);
  };

  useEffect(() => {
    // Start a short loading screen when user open the application / Start a short loading screen when user press enter on keyboard while using search function
    const startLoadingScreen = async () => {
      setIndexForRecipeFromSearchBar();
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 700)); // Wait 700 milisecs

      setLoading(false);
    };

    startLoadingScreen();
  }, [recipeFromSearchBar]);

  return (
    <View style={styles.container}>
      <FilterButtons
        OnFetchRecipe={handleRecipesUpdate}
        loadingTest={handleLoading}
        resetSearch={resetRecipeFromSearch}
      />

      {isLoading ? (
        <View style={styles.loadingScreen}>
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <FoodMenu
          allRecipes={
            recipeFromSearch.length > 0 ? recipeFromSearch : allRecipes
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    height: "70%",
    bottom: "2.5%",
    //backgroundColor: "purple",
  },

  loadingScreen: {
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "red",
    width: "100%",
    height: "90%",
  },
});
