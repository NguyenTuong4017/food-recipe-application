import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { fetchRecipeInfomation } from "../../../Fetch/fetch";
import { useEffect, useState } from "react";
import useCustomFonts from "../../../Fonts";

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

        {/* navigation bar */}
        <View style={styles.navigationBar}>
          {/* Description tab */}
          <TouchableOpacity style={styles.navigationTab}>
            <Text style={styles.navigationTabTitle}>Servings</Text>
          </TouchableOpacity>

          {/* Ingredients tab */}
          <TouchableOpacity
            style={[
              styles.navigationTab,
              { backgroundColor: "rgba(217, 217, 217, 0.4)" },
            ]}
          >
            <Text style={styles.navigationTabTitle}>Likes</Text>
          </TouchableOpacity>

          {/* Instruction tab */}
          <TouchableOpacity style={styles.navigationTab}>
            <Text style={styles.navigationTabTitle}> Time</Text>
          </TouchableOpacity>
        </View>
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
  navigationBar: {
    width: "93%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
  },
  navigationTab: {
    height: "90%",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },

  navigationTabTitle: {
    fontSize: 20,
    fontFamily: "Montserrat-SemiBold",
  },
});
