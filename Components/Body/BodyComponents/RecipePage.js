import { StyleSheet, Text, View, Image } from "react-native";
import { fetchRecipeInfomation } from "../../../Fetch/fetch";
import { useEffect, useState } from "react";
import useCustomFonts from "../../../Fonts";

import NavigationBar from "./Template/RecipePageTemplate/NavigationBar/NavigationBar";

export default function RecipePage({ route }) {
  const { id } = route.params;
  const [recipeInfo, setRecipeInfo] = useState({});

  //get fonts
  const fontsLoaded = useCustomFonts();

  //fetch the recipe data by id
  const handleFetch = () => {
    fetchRecipeInfomation(id)
      .then((data) => setRecipeInfo(data))
      .catch((err) => console.log("Error: ", err));
  };

  //start fetching
  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <View style={styles.container}>
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
        {/*Navigation bar*/}
        <NavigationBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  recipeInfo: {
    width: "100%",
    height: "80%",
    marginTop: 30,

    justifyContent: "space-evenly",
    alignItems: "center",

    bottom: 40,
  },
  recipeTitle: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 30,
    width: "93%",
  },

  recipeThumb: {
    width: "100%",
    height: "100%",
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
