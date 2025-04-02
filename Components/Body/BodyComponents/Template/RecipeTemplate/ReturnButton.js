import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import ArrowLeft from "../../../../../assets/icons/arrowleft.svg";

export default function ReturnButton({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.container}
    >
      <ArrowLeft width={30} height={30} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    //borderWidth: 1,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 5,
    backgroundColor: "#F5F5F5",
  },
});
