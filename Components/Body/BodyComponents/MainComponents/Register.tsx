import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../../../../FirebaseConfig";
import useCustomFonts from "../../../../JavaScriptFiles/Fonts";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Registered as:", userCredential.user.email);
      Alert.alert("Success", "Account created successfully!");
    } catch (error: any) {
      console.log("Registration Error:", error.message);
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create your account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          selectionColor="#272727"
          value={displayName}
          onChangeText={(text) => setDisplayName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          selectionColor="#272727"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          selectionColor="#272727"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={{ fontFamily: "Montserrat-SemiBold", color: "#FFFFFF" }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomText}>
        <Text style={styles.registerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[styles.registerText, { color: "#051220" }]}>
            {" "}
            Login Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  header: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 25,
    width: "90%",
    marginBottom: 30,
    top: 20,
  },

  inputContainer: {
    width: "90%",
    height: "40%",
    alignItems: "center",
    top: 20,
  },

  input: {
    width: "100%",
    height: "22%",
    marginBottom: 12,
    borderRadius: 10,
    padding: 10,
    fontFamily: "Montserrat-SemiBold",
    backgroundColor: "#f1f1f1",
  },

  registerButton: {
    marginTop: 25,
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#111111",
  },

  bottomText: {
    width: "90%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    top: 40,
  },

  registerText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 15,
  },
});
