import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // for the small circle edit button
import PencilIcon from "../../../../assets/icons/pencil.svg";
import { auth } from "../../../../FirebaseConfig";
import { storage } from "../../../../FirebaseConfig";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { Alert } from "react-native";
import ReturnButton from "../SubComponents/RecipePageComponents/Buttons/ReturnButton";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Edit({ navigation }) {
  const currUsername = auth.currentUser?.displayName; // get the current username on firebase

  const [username, setUsername] = useState(currUsername);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //update the username and password
  const handleUpdate = async () => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: username }); //update username

        //update password
        if (newPassword != "" && newPassword == confirmPassword) {
          await updatePassword(auth.currentUser, newPassword);
        }

        //pop up notification
        Alert.alert("Success", "Profile updated successfully!", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Home");
            },
          },
        ]);
      }
    } catch (error) {
      console.log("Update error:", error);
      Alert.alert("Update Failed", "Please check again your new information"); //pop up notification
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <ReturnButton navigation={navigation} />
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleUpdate}>
          <Text style={styles.headerButton}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username ?? ""}
          onChangeText={(text) => setUsername(text)}
          placeholder="Enter your username"
        />

        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          placeholder="Enter new password"
          secureTextEntry
        />

        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholder="Confirm new password"
          secureTextEntry
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    //borderWidth: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerButton: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    color: "#242424",
  },
  headerTitle: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    position: "relative",
    //borderWidth: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIconContainer: {
    position: "absolute",
    bottom: -10,
    right: "35%",
    backgroundColor: "#d6d6d6",
    borderRadius: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: "#d6d6d6",
  },
  inputGroup: {
    marginTop: 10,
  },
  label: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    marginBottom: 5,
    marginTop: 15,
    color: "#333",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#dcdcdc",
    fontSize: 16,
    paddingVertical: 8,
    fontFamily: "Montserrat-Regular",
  },
});
