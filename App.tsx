import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";
export default function App() {
  const [recipes, setRecipes] = useState<Array<Object>>([]);

  const handleRecipe = (recipesFromSearchBar: Array<Object>) => {
    setRecipes(recipesFromSearchBar);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Header passRecipeToApp={handleRecipe} />
        <Body recipeFromSearchBar={recipes} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
