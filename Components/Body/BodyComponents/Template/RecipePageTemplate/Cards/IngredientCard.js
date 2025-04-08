import { Image, StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";
export default function IngredientCard({ name, image, original }) {
  const updatedImage =
    "https://img.spoonacular.com/ingredients_100x100/" + image;

  return (
    <View style={styles.container}>
      <Image source={{ uri: updatedImage }} style={styles.ingreThumb} />

      <View style={styles.text}>
        <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 20 }}>
          {name}
        </Text>
        <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 15 }}>
          {original}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //borderWidth: 1.5,
    width: "100%",
    height: 130,
    justifyContent: "space-between",
    backgroundColor: "#dfdfdf",
    borderRadius: 15,
    borderColor: "#696969",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  ingreThumb: {
    width: 110,
    height: 110,
    borderRadius: 15,
  },

  text: {
    //borderWidth: 1,
    width: "60%",
    height: "100%",
    justifyContent: "space-evenly",
    padding: 5,
  },
});
