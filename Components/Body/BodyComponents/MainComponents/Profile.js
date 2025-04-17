import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import useCustomFonts from "../../../../JavaScriptFiles/Fonts";
export default function Profile() {
  const fontsLoaded = useCustomFonts();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.informationContainer}>
        <Image
          source={require("../../../../assets/avatar.png")}
          style={styles.avatar}
        />
        <Text style={{ fontSize: 25, fontFamily: "Montserrat-SemiBold" }}>
          Tuong Nguyen
        </Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={{ fontSize: 18, fontFamily: "Montserrat-Medium" }}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //borderWidth: 1,
    flex: 1,
    backgroundColor: "#ffffff",
  },

  informationContainer: {
    //borderWidth: 1,
    height: 270,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  editButton: {
    height: 40,
    width: 80,
    //borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#d6d6d6",
  },
});
