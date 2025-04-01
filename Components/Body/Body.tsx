import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from "react";

import FilterButtons from "./BodyComponents/FilterButtons";

import FoodMenu from "./BodyComponents/FoodMenu";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
    setIndexForRecipeFromSearchBar();
  }, [recipeFromSearchBar]);

  console.log(recipeFromSearchBar);
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
