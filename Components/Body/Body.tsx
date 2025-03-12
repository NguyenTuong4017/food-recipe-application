import { StyleSheet, View } from "react-native";
import { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SortButtons from "./BodyComponents/SortButtons";
import AllRecipePage from "./BodyComponents/Pages/AllRecipePage";
import MainCoursePage from "./BodyComponents/Pages/MainCousresPage";
import BreakfastPage from "./BodyComponents/Pages/BreakfastPage";
import LunchPage from "./BodyComponents/Pages/LunchPage";
import DinnerPage from "./BodyComponents/Pages/DinnerPage";

export default function Body() {
  return (
    <View style={styles.container}>
      <SortButtons />
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
