import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fetchRecipeInfo } from "../../../../Fetch/fetch";
import { useEffect, useState } from "react";

interface FoodCardProps {
  name: string;
  imgUrl: string;
  recipeId: number;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function FoodCard({ name, imgUrl, recipeId }: FoodCardProps) {
  const [recipeInfo, setRecipeInfo] = useState({ readyInMinutes: "" });

  const handleFetch = () => {
    fetchRecipeInfo(recipeId)
      .then((data) => {
        setRecipeInfo(data);
        console.log(data.readyInMinutes);
      })
      .catch((err) => console.log("Fetch error: " + err));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const fakeMin = () => {
    const randomNumber = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    return randomNumber.toString();
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: imgUrl }} style={styles.foodThumb} />
      <LinearGradient
        colors={["transparent", "rgba(0, 0, 0, 1)"]}
        style={styles.gradient}
      />
      <View style={styles.textContainer}>
        <Text
          style={[styles.foodText, { fontSize: 30 }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
        <View style={styles.timeContainer}>
          <Text style={{ fontSize: 16, color: "#FFFFFF" }}>
            {recipeInfo.readyInMinutes ? recipeInfo.readyInMinutes : fakeMin()}{" "}
            mins
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
    //backgroundColor: "red",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  foodThumb: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  textContainer: {
    position: "absolute",
    padding: 10,
    //backgroundColor: "green",
    width: "100%",
    height: "25%",
    bottom: 10,
    justifyContent: "space-around",
  },
  foodText: {
    color: "#fff",
    fontWeight: "bold",
  },
  timeContainer: {
    backgroundColor: "rgba(217, 217, 217, 0.46)",
    width: "33%",
    height: "35%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  gradient: {
    height: "50%",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});
