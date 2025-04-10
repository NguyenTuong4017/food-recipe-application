import { useEffect, useMemo, useState } from "react";
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
import IngredientCard from "../../Cards/IngredientCard";
import { wrapHtml } from "../../../../../../JavaScriptFiles/wrapHtml";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");
const navigationBarWidth = width * 0.93;

interface NavigationBarProps {
  description: string;
  ingredients: {
    name: string;
    image: string;
    original: string;
  }[];
  instructions: string[];
}

export default function NavigationBar({
  description,
  ingredients,
  instructions,
}: NavigationBarProps) {
  const tabs = ["Description", "Ingredients", "Instructions"];
  const [selectedTab, setSelectedTab] = useState(0);
  const translateX = useSharedValue(0);
  const tabOpacity = useSharedValue(1);
  const tabTranslateY = useSharedValue(0);
  const [IngreRef, setIngreRef] = useState<
    {
      name: string;
      image: string;
      original: string;
    }[]
  >([]);

  //wrap desc in html format to pass the validation of WebView
  const wrappedDesc = wrapHtml(description);
  //wrap instruction in html format to pass the validation of WebView
  const wrappedInstruction = wrapHtml(instructions);

  //set the selected tab and move the grey box to the selected tab
  const handlePress = (index: number) => {
    setSelectedTab(index);
    translateX.value = withTiming(index * (navigationBarWidth / tabs.length), {
      duration: 400,
    });

    tabOpacity.value = withSequence(
      withTiming(0, { duration: 0 }),
      withTiming(1, { duration: 650 })
    );

    tabTranslateY.value = withSequence(
      withTiming(30, { duration: 0 }),
      withTiming(0, { duration: 650 })
    );
  };

  //update the recipe to a new simple object with 3 properties
  const handleIngredients = () => {
    if (ingredients) {
      const updated = ingredients.map((item) => ({
        name: item.name,
        image: item.image,
        original: item.original,
      }));
      setIngreRef(updated);
    }
  };

  //run the handleIngredients function to handle the updating
  useEffect(() => {
    handleIngredients();
  }, [ingredients]);

  //set the position for grey box
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  //set the height for tab
  const tabAnimatedStyle = useAnimatedStyle(() => ({
    opacity: tabOpacity.value,
    transform: [{ translateY: tabTranslateY.value }],
  }));

  return (
    <>
      <Animated.View style={[styles.navigationBar]}>
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

      {/* tab */}
      <Animated.View style={[tabAnimatedStyle, styles.tab]}>
        {selectedTab === 0 ? (
          //Description tab
          <View style={{ width: "100%", height: 500 }}>
            <WebView
              originWhitelist={["*"]}
              source={{ html: wrappedDesc }}
              style={{ backgroundColor: "transparent" }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : selectedTab === 1 ? (
          // Ingredients Tab
          IngreRef.map((item, index) => (
            <IngredientCard
              key={index}
              name={item.name}
              image={item.image}
              original={item.original}
            />
          ))
        ) : (
          //Instruction tab
          <View style={{ width: "100%", height: 500 }}>
            <WebView
              originWhitelist={["*"]}
              source={{ html: wrappedInstruction }}
              style={{ backgroundColor: "transparent" }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
      </Animated.View>
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
    marginBottom: 20,
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
    alignItems: "center",
    overflow: "hidden",
    //borderWidth: 2,
    borderColor: "#adadad",
    marginBottom: 20,
    padding: 15,
  },
});
