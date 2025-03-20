import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";

import SortButtons from "./BodyComponents/SortButtons";
import FoodCard from "./BodyComponents/Template/FoodCard";
import FoodMenu from "./BodyComponents/FoodMenu";

export default function Body() {
  const [allRecipes, setAllRecipes] = useState<Array<Object>>([]);

  const handleRecipesUpdate = (recipes: Array<Object>) => {
    setAllRecipes(recipes);
  };

  return (
    <View style={styles.container}>
      <SortButtons OnFetchRecipe={handleRecipesUpdate} />
      <FoodMenu allRecipes={allRecipes} />
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
