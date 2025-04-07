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
  withSequence,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const navigationBarWidth = width * 0.93;

export default function NavigationBar() {
  const tabs = ["Description", "Ingredients", "Instructions"];
  const [selectedTab, setSelectedTab] = useState(0);
  const translateX = useSharedValue(0);
  const tabHeight = useSharedValue(1000);
  const borderRadius = useSharedValue(0);
  const [isExpand, setExpand] = useState(true);

  //set the selected tab and move the grey box to the selected tab
  const handlePress = (index: number) => {
    setSelectedTab(index);
    translateX.value = withTiming(index * (navigationBarWidth / tabs.length), {
      duration: 400,
    });
    tabHeight.value = withSequence(
      withTiming(0, { duration: 500 }),
      withTiming(1000, { duration: 700 })
    );
  };

  //set the position for grey box
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  //set the height for tab
  const tabAnimatedStyle = useAnimatedStyle(() => ({
    height: tabHeight.value,
    borderTopLeftRadius: borderRadius.value,
    borderTopRightRadius: borderRadius.value,
  }));

  const barAnimatedStyle = useAnimatedStyle(() => ({
    borderBottomLeftRadius: borderRadius.value,
    borderBottomRightRadius: borderRadius.value,
  }));

  return (
    <>
      <Animated.View style={[barAnimatedStyle, styles.navigationBar]}>
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
      </Animated.View>
      <Animated.View style={[tabAnimatedStyle, styles.tab]}></Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  navigationBar: {
    width: navigationBarWidth,
    height: 100,
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

  tab: {
    width: navigationBarWidth,
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: "hidden",
  },
});
