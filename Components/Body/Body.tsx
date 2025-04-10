import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect, useRef } from "react";

import FilterButtons from "./BodyComponents/MainComponents/FilterButtons";

import FoodMenu from "./BodyComponents/MainComponents/RecipeMenu";
import LoadingScreen from "../../JavaScriptFiles/LoadingScreen";
import LottieView from "lottie-react-native";

interface BodyProps {
  recipeFromSearchBar: Array<Object>;
}

export default function Body({ recipeFromSearchBar }: BodyProps) {
  const [allRecipes, setAllRecipes] = useState<Array<Object>>([]); //Recipe get from filter buttons

  const [isLoading, setLoading] = useState<boolean>(true); //Loading Status
  const animationRef = useRef<LottieView>(null); //Ref for controlling the Lottie animations

  //recipeFromSearchBar's objects doesn't have the index property, this is an update with index property
  const [recipeFromSearchWithIndex, setRecipeFromSearchWithIndex] = useState<
    Array<{ index: number }>
  >([]);

  //Because the objects in the recipeFromSearchBar doesn't have index property, this function adds the index to them.
  const setIndexForRecipeFromSearchBar = () => {
    const updatedRecipes = recipeFromSearchBar.map((recipe, index) => ({
      ...recipe,
      index: index,
    }));

    setRecipeFromSearchWithIndex(updatedRecipes);
  };

  //Get the recipes from filter buttons
  const handleRecipesUpdate = (recipes: Array<Object>) => {
    setAllRecipes(recipes);
    replayAnimation();
  };

  //Reset the recipeFromSearchBar to empty when user clicks a filter button.
  const resetRecipeFromSearch = () => {
    setRecipeFromSearchWithIndex([]);
  };

  //Restart the loading animation
  const replayAnimation = () => {
    if (animationRef.current) {
      animationRef.current.reset();
      animationRef.current.play();
    }
  };

  //Handle the loading progress
  const handleLoading = (loading: boolean) => {
    setLoading(loading);
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

      {/* if the recipeFromSearch is existed then show it on screen otherwise show the recipes from filter buttons */}
      {isLoading ? (
        <LoadingScreen animationRef={animationRef} />
      ) : (
        <FoodMenu
          allRecipes={
            recipeFromSearchWithIndex.length > 0
              ? recipeFromSearchWithIndex
              : allRecipes
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
});
