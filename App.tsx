import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
import RecipePage from "./Components/Body/BodyComponents/MainComponents/RecipePage";
import { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ReturnButton from "./Components/Body/BodyComponents/SubComponents/RecipePageComponents/Buttons/ReturnButton";
import FavoriteButton from "./Components/Body/BodyComponents/SubComponents/RecipePageComponents/Buttons/FavoriteButton";
import Login from "./Components/Body/BodyComponents/MainComponents/Login";
import Register from "./Components/Body/BodyComponents/MainComponents/Register";
import useCustomFonts from "./JavaScriptFiles/Fonts";
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
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
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
