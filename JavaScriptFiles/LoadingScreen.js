import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";
export default function LoadingScreen({ animationRef }) {
  return (
    <View style={styles.loadingScreen}>
      <LottieView
        ref={animationRef}
        source={require("../assets/animations/circleLoading.json")}
        loop={false}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "90%",
  },
});
