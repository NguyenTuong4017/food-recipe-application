import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { fetchRecipeInfomation } from "../../../Fetch/fetch";
import { useEffect, useState } from "react";
import useCustomFonts from "../../../Fonts";

export default function RecipePage({ route }) {
  const { id } = route.params;
  const [recipeInfo, setRecipeInfo] = useState({});

  const fontsLoaded = useCustomFonts();

  const handleFetch = () => {
    fetchRecipeInfomation(id)
      .then((data) => setRecipeInfo(data))
      .catch((err) => console.log("Error: ", err));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{recipeInfo.title}</Text>

        <View style={styles.styledRecipeThumbWithTime}>
          <Image
            source={{ uri: recipeInfo.image }}
            style={styles.recipeThumb}
          />
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

        <View style={styles.recipePreparation}>
          <TouchableOpacity style={styles.recipePreparationSmallContainers}>
            <View>
              <Text style={styles.recipePreparationTitle}>Servings</Text>
              <Text style={styles.recipePreparationDesc}>
                {recipeInfo.servings}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.recipePreparationSmallContainers,
              { backgroundColor: "rgba(217, 217, 217, 0.4)" },
            ]}
          >
            <View>
              <Text style={styles.recipePreparationTitle}>Likes</Text>
              <Text style={styles.recipePreparationDesc}>
                {recipeInfo.aggregateLikes}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.recipePreparationSmallContainers}>
            <View>
              <Text style={styles.recipePreparationTitle}> Time</Text>
              <Text style={styles.recipePreparationDesc}>
                {recipeInfo.readyInMinutes} mins
              </Text>
            </View>
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
  recipePreparation: {
    width: "93%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
  },
  recipePreparationSmallContainers: {
    height: "90%",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },

  recipePreparationTitle: {
    fontSize: 20,
    fontFamily: "Montserrat-SemiBold",
  },

  recipePreparationDesc: {
    fontSize: 15,
    fontFamily: "Montserrat-Medium",
    marginTop: 5,
  },
});
