import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface FavoriteRecipeCardProps {
  title: string;
  image: string;
  readyInMinutes: number;
  onPress?: () => void;
}

export default function FavoriteRecipeCard({
  title,
  image,
  readyInMinutes,
}: FavoriteRecipeCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.recipeImage}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.recipeTitle} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.recipeTime}>{readyInMinutes} mins</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 5,
    alignSelf: "center",
  },
  recipeImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 15,
    backgroundColor: "#FAFAFA",
  },
  recipeTitle: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
    color: "#333333",
    marginBottom: 8,
  },
  recipeTime: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: "#7D7D7D",
  },
});
