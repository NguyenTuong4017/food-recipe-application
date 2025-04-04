import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const navigationBarWidth = width * 0.93;

export default function NavigationBar() {
  const tabs = ["Description", "Ingredients", "Instructions"];
  const [selectedTab, setSelectedTab] = useState(0);
  const translateX = useSharedValue(0);

  //set the selected tab and move the grey box to the selected tab
  const handlePress = (index: number) => {
    setSelectedTab(index);
    translateX.value = withTiming(index * (navigationBarWidth / tabs.length), {
      duration: 250,
    });
  };

  //set the position for grey box
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.navigationBar}>
      {/* grey box */}
      <Animated.View style={[styles.animatedBox, animatedStyle]} />

      {/* show the tabs */}
      {tabs.map((tabTitle, index) => (
        <TouchableOpacity
          key={index}
          style={styles.navigationTab}
          onPress={() => handlePress(index)}
        >
          <Text
            style={[
              { fontSize: 15 },
              selectedTab == index
                ? { fontFamily: "Montserrat-SemiBold" }
                : { fontFamily: "Montserrat-Regular" },
            ]}
          >
            {tabTitle}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navigationBar: {
    width: navigationBarWidth,
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
  },
  navigationTab: {
    height: "90%",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },

  animatedBox: {
    position: "absolute",
    height: "90%",
    width: "30%",
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
  },
});
