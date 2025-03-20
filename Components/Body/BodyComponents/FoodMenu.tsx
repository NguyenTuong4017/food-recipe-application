import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import FoodCard from "./Template/FoodCard";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const sampleData = [
  {
    id: 0,
    name: "Seafood Spaghetti",
    imgUrl: require("../../../assets/sampleData/IMG_6471.jpeg"),
    curr: "yes",
  },
  {
    id: 1,
    name: "Carbonara",
    imgUrl: require("../../../assets/sampleData/IMG_6515.jpeg"),
    curr: "no",
  },
  {
    id: 2,
    name: "Shawarma",
    imgUrl: require("../../../assets/sampleData/IMG_7442.jpeg"),
    curr: "no",
  },
  {
    id: 3,
    name: "Steak",
    imgUrl: require("../../../assets/sampleData/IMG_7519.jpeg"),
    curr: "no",
  },
  {
    id: 4,
    name: "Croissant",
    imgUrl: require("../../../assets/sampleData/IMG_9158.jpeg"),
    curr: "no",
  },
];

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const cardWidth = screenWidth * 0.69;
const spacing = 20;

export default function FoodMenu() {
  const translateX = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const cardHeight = useSharedValue(100);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value =
        event.translationX - currentIndex.value * (cardWidth + spacing);
    })

    .onEnd((event) => {
      if (event.velocityX < -500 || event.translationX < -cardWidth / 2) {
        if (currentIndex.value < sampleData.length - 1) {
          currentIndex.value += 1;
        }
      } else if (event.velocityX > 500 || event.translationX > cardWidth / 2) {
        if (currentIndex.value > 0) {
          currentIndex.value -= 1;
        }
      }
      translateX.value = withSpring(
        -currentIndex.value * (cardWidth + spacing),
        {
          damping: 50,
        }
      );
      console.log("currentIndex after swipe:", currentIndex.value);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.quantity}>{sampleData.length} recipes</Text>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[animatedStyle, styles.foodList]}>
          {sampleData.map((item, index) => {
            const cardAnimatedStyle = useAnimatedStyle(() => {
              const cardPosition =
                translateX.value + index * (cardWidth + spacing);

              if (Math.abs(cardPosition) > screenWidth) {
                return { opacity: 0, height: screenHeight * 0.5 }; // Hide off-screen cards
              }

              return {
                opacity: interpolate(
                  cardPosition,
                  [-cardWidth, 0, cardWidth],
                  [0, 1, 1]
                ),

                height: interpolate(
                  cardPosition,
                  [-cardWidth, 0, cardWidth],
                  [100, screenHeight * 0.55, screenHeight * 0.5]
                ),
              };
            });
            return (
              <Animated.View
                key={item.id}
                style={[
                  styles.cardContainer,
                  { width: cardWidth },
                  cardAnimatedStyle,
                ]}
              >
                <FoodCard name={item.name} imgUrl={item.imgUrl} />
              </Animated.View>
            );
          })}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    //borderWidth: 1,
  },

  quantity: {
    fontSize: 24,
    marginBottom: 15,
    marginLeft: 20,
  },
  foodList: {
    //backgroundColor: "red",
    width: "100%",
    height: "85%",
    flexDirection: "row",
  },
  cardContainer: {
    marginHorizontal: spacing / 2,
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  flatListContent: {
    gap: 0,
    padding: 0,
    alignItems: "center",
  },
});
