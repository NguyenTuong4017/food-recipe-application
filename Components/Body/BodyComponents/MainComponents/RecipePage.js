import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { fetchRecipeInfomation } from "../../../../Fetch/fetch";
import { useEffect, useState } from "react";
import useCustomFonts from "../../../../JavaScriptFiles/Fonts";

import NavigationBar from "../SubComponents/RecipePageComponents/NavigationBar/NavigationBar";
import FavoriteButton from "../SubComponents/RecipePageComponents/Buttons/FavoriteButton";
import { useLayoutEffect } from "react";

export default function RecipePage({ route, navigation }) {
  const { id } = route.params;
  const [recipeInfo, setRecipeInfo] = useState({});
  const [height, setHeight] = useState(0);

  //get fonts
  const fontsLoaded = useCustomFonts();

  //fetch the recipe data by id
  const handleFetch = () => {
    fetchRecipeInfomation(id)
      .then((data) => {
        setRecipeInfo(data);
        navigation.setOptions({
          headerRight: () => <FavoriteButton recipeInfo={data} />,
        });
      })
      .catch((err) => console.log("Error: ", err));
  };

  //start fetching
  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* The container of recipe name, image and navigation bar */}
      <View style={styles.recipeInfo}>
        {/* recipe name */}
        <Text style={styles.recipeTitle}>{recipeInfo.title}</Text>

        {/* Recipe image with cooking time */}
        <View style={styles.styledRecipeThumbWithTime}>
          <Image
            source={{ uri: recipeInfo.image }}
            style={styles.recipeThumb}
          />

          {/* cooking time styled in a pill shape */}
          <View style={styles.recipeCookedTime}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Montserrat-Medium",
                color: "#FFFFFF",
              }}
            >
              {recipeInfo.readyInMinutes} mins
            </Text>
          </View>
        </View>
      </View>
      <NavigationBar
        description={recipeInfo.summary}
        ingredients={recipeInfo.extendedIngredients}
        instructions={recipeInfo.instructions}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    alignItems: "center",
  },
  recipeInfo: {
    width: "100%",
    flex: 1,
    marginTop: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
  },
  recipeTitle: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 30,
    width: "93%",
    marginBottom: 20,
  },

  recipeThumb: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderRadius: 15,
  },
  recipeCookedTime: {
    position: "absolute",
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "rgba(217, 217, 217, 0.7)",
    right: 0,
    marginTop: 10,
    marginRight: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  styledRecipeThumbWithTime: {
    width: "93%",
    height: "50%",
  },
});
