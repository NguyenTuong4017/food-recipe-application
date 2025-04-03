import { StyleSheet, Text, View, Image } from "react-native";
import { fetchRecipeInfomation } from "../../../Fetch/fetch";
import { useEffect, useState } from "react";
import useCustomFonts from "../../../Fonts";
export default function RecipePage({ route }) {
  const { id } = route.params;
  const [recipeInfo, setRecipeInfo] = useState({});

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
        <Image source={{ uri: recipeInfo.image }} style={styles.recipeThumb} />
        <View style={styles.recipePreparation}>
          <View style={styles.recipePreparationSmallContainers}>
            <Text>Servings</Text>
            <Text>{recipeInfo.servings}</Text>
          </View>
          <View style={styles.recipePreparationSmallContainers}>
            <Text>Likes</Text>
            <Text>{recipeInfo.aggregateLikes}</Text>
          </View>
          <View style={styles.recipePreparationSmallContainers}>
            <Text>Time</Text>
            <Text>{recipeInfo.readyInMinutes} mins</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    //borderWidth: 1,
  },
  recipeInfo: {
    width: "100%",
    height: "70%",
    marginTop: 30,
    marginLeft: 15,
    //backgroundColor: "red",
    justifyContent: "space-evenly",
    //borderWidth: 1,
  },
  recipeTitle: {
    fontFamily: "Montserrat-Medium",
    fontSize: 30,
    width: "90%",
    //borderWidth: 1,
  },
  recipeThumb: {
    width: "93%",
    height: "50%",
  },
  recipePreparation: {
    borderWidth: 1,
    width: "93%",
    height: "25%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  recipePreparationSmallContainers: {
    borderWidth: 1,
    height: "100%",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
});
