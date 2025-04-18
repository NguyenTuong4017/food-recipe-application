import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import useCustomFonts from "../../../../JavaScriptFiles/Fonts";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged in as:", user.email);
      }
    });

    return unsubcribe;
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Login success: ", userCredential.user.email);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(
        "Login Failed",
        "Email or password is incorrect. Please check and try again."
      );
      console.log("Login error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome back! Glad to see you, Again!</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          selectionColor="#272727"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          selectionColor="#272727"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        {/* <TouchableOpacity style={{ width: "100%", alignItems: "flex-end" }}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={{ fontFamily: "Montserrat-SemiBold", color: "#FFFFFF" }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.otherOptions}>
        <View style={styles.register}>
          <Text style={[styles.registerText, { alignSelf: "flex-end" }]}>
            Don't have an account?
          </Text>
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={[styles.registerText, { color: "#FAEDDF" }]}>
              {" "}
              Register Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
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
  forgotPassword: {
    fontFamily: "Montserrat-SemiBold",
    color: "#636363",
    fontSize: 14,
  },

  loginButton: {
    marginTop: 25,
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#111111",
  },

  otherOptions: {
    width: "90%",
    height: "40%",

    alignItems: "center",
    top: 20,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    color: "#6e6e6e",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 13,
    fontWeight: "500",
  },

  iconsContainer: {
    flexDirection: "row",

    width: "100%",
    height: "30%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  icon: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: "30%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  register: {
    flexDirection: "row",

    width: "100%",
    flex: 1,
    justifyContent: "center",
  },

  registerText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 15,
  },
});
