import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import UserInfo from "./HeaderComponents/UserInfo";
import SearchBar from "./HeaderComponents/SearchBar";
export default function Header() {
  return (
    <View style={styles.container}>
      <UserInfo />
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "30%",
    //backgroundColor: "red",
  },
});
