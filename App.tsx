import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
import Footer from "./Components/Footer/Footer";
import RecipePage from "./Components/Body/BodyComponents/RecipePage";
import { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ReturnButton from "./Components/Body/BodyComponents/Template/RecipeTemplate/ReturnButton";

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
              headerShadowVisible: false,
              headerTitleStyle: {
                fontSize: 22,
                fontWeight: 500,
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
