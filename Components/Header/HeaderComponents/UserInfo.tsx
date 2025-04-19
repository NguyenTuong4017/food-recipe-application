import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SignOut from "../../../assets/icons/signout.svg";
import useCustomFonts from "../../../JavaScriptFiles/Fonts";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../../../FirebaseConfig";

export default function UserInfo() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.log("Logout error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* user avatar and menu icon */}
      <View style={styles.avatarAndIcon}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("../../../assets/blank.png")}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.menuIconContainer}>
            <SignOut width={"40%"} height={"40%"} />
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
    fontFamily: "Montserrat-SemiBold",
  },
});
