import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
import RecipePage from "./Components/Body/BodyComponents/RecipePage";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ReturnButton from "./Components/Body/BodyComponents/Template/RecipeTemplate/ReturnButton";
import FavoriteButton from "./Components/Body/BodyComponents/Template/RecipeTemplate/FavoriteButton";
import useCustomFonts from "./Fonts";
const Stack = createStackNavigator();

export default function App() {
  const [recipes, setRecipes] = useState<Array<Object>>([]);

  const handleRecipe = (recipesFromSearchBar: Array<Object>) => {
    setRecipes(recipesFromSearchBar);
  };

  const HomeScreen = () => {
    return (
      <View style={styles.container}>
        <Header passRecipeToApp={handleRecipe} />
        <Body recipeFromSearchBar={recipes} />
      </View>
    );
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Recipe"
            component={RecipePage}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => <ReturnButton navigation={navigation} />,
              headerRight: () => <FavoriteButton />,
              headerShadowVisible: false,
              headerTitleStyle: {
                fontSize: 22,
                width: "100%",
                fontFamily: "Montserrat-Medium",
              },
              headerStyle: {
                backgroundColor: "#FFFFFF",
              },
            })}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
