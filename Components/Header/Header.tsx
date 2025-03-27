import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import UserInfo from "./HeaderComponents/UserInfo";
import SearchBar from "./HeaderComponents/SearchBar";
import { useState } from "react";

interface HeaderProps {
  passRecipeToApp: (recipes: Array<Object>) => void;
}

export default function Header({ passRecipeToApp }: HeaderProps) {
  //get recipe from search bar component
  const handleRecipe = (recipesFromSearchBar: Array<Object>) => {
    passRecipeToApp(recipesFromSearchBar);
  };

  return (
    <View style={styles.container}>
      <UserInfo />
      <SearchBar passRecipeToHeader={handleRecipe} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "30%",
    //backgroundColor: "red",
  },
});
