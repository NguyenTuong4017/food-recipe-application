import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from "react";

import FilterButtons from "./BodyComponents/FilterButtons";

import FoodMenu from "./BodyComponents/FoodMenu";
import { ActivityIndicator } from "react-native";
import HorizontalFoodCard from "./BodyComponents/Template/HorizontalFoodCard/HorizontalFoodCard";

interface BodyProps {
  recipeFromSearchBar: Array<Object>;
}

export default function Body({ recipeFromSearchBar }: BodyProps) {
  const [allRecipes, setAllRecipes] = useState<Array<Object>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleRecipesUpdate = (recipes: Array<Object>) => {
    setAllRecipes(recipes);
  };

  const handleLoading = (loading: boolean) => {
    setLoading(loading);
  };

  return (
    <View style={styles.container}>
      <FilterButtons
        OnFetchRecipe={handleRecipesUpdate}
        loadingTest={handleLoading}
      />

      {isLoading ? (
        <View style={styles.loadingScreen}>
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <FoodMenu allRecipes={allRecipes} />
      )}
      {/* <HorizontalFoodCard /> */}
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
