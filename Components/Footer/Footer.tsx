import { Text, View, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text>Footer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "10%",
    backgroundColor: "yellow",
  },
});
