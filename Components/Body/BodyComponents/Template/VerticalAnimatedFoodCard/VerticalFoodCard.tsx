import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface FoodCardProps {
  name: string;
  imgUrl: string;
  likes: number;
  aggregateLikes: number;
}

export default function VerticalFoodCard({
  name,
  imgUrl,
  likes,
  aggregateLikes,
}: FoodCardProps) {
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
            {likes != undefined ? likes : aggregateLikes} likes
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
