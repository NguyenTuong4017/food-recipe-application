import SortButtons from "./BodyComponents/SortButtons";
import { StyleSheet, View } from "react-native";
export default function Body() {
  return (
    <View style={styles.container}>
      <SortButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "70%",
    bottom: "2.5%",
    //backgroundColor: "purple",
  },
});
