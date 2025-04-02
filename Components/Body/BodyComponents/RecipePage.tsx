import { StyleSheet, Text, View } from "react-native";
export default function RecipePage() {
  return (
    <View style={styles.container}>
      <Text>Recipe Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
