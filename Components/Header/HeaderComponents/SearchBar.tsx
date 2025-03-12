import { StyleSheet, Text, TextInput, View } from "react-native";
import GlassIcon from "../../../assets/icons/glassicon.svg";
export default function SearchBar() {
  return (
    // glass icon and TextInput
    <View style={styles.container}>
      <GlassIcon style={styles.icon} height={"50%"} />
      <TextInput
        style={styles.input}
        placeholder="Search recipes"
        selectionColor={"#898989"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "40%",
    //backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 35,
    bottom: 10,
  },
  input: {
    width: "77%",
    height: "50%",
    //backgroundColor: "green",
    borderBottomWidth: 1,
    fontSize: 15,
  },

  icon: {
    borderBottomWidth: 1,
    //backgroundColor: "blue",
  },
});
