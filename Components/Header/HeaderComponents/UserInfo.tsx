import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MenuIcon from "../../../assets/icons/menuicon.svg";

export default function UserInfo() {
  return (
    <View style={styles.container}>
      {/* user avatar and menu icon */}
      <View style={styles.avatarAndIcon}>
        <Image
          source={require("../../../assets/avatar.png")}
          style={styles.avatar}
        />
        <TouchableOpacity>
          <View style={styles.menuIconContainer}>
            <MenuIcon width={"40%"} height={"40%"} />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.helloText}>Get Cooking Today!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "50%",
    width: "100%",
    alignContent: "center",
    //backgroundColor: "blue",
    justifyContent: "space-between",
    top: 10,
  },
  avatarAndIcon: {
    width: "100%",
    height: "50%",
    //backgroundColor: "purple",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginLeft: 15,
  },
  menuIconContainer: {
    width: 55,
    height: 55,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginRight: 15,
  },
  helloText: {
    fontSize: 30,
    marginLeft: 15,
    fontWeight: "600",
  },
});
