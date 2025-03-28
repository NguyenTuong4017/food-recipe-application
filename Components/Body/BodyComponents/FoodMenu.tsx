import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import VerticalAnimatedFoodCard from "./Template/VerticalAnimatedFoodCard/VerticalAnimatedFoodCard";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

//Set the width and space for each card
const { width: screenWidth } = Dimensions.get("window");
const cardWidth = screenWidth * 0.69;
const spacing = 20;

interface FoodMenuProps {
  allRecipes: any;
}

export default function FoodMenu({ allRecipes }: FoodMenuProps) {
  const translateX = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  //A function to handle the swiping
  const panGesture = Gesture.Pan()
    //when user start swiping
    .onUpdate((event) => {
      //set the translateX value to the current translateX when user swipe
      translateX.value =
        event.translationX - currentIndex.value * (cardWidth + spacing);
    })

    //when user stop swiping
    .onEnd((event) => {
      //set the currentIndex as the current card
      if (event.velocityX < -500 || event.translationX < -cardWidth / 2) {
        if (currentIndex.value < allRecipes.length - 1) {
          currentIndex.value += 1;
        }
      } else if (event.velocityX > 500 || event.translationX > cardWidth / 2) {
        if (currentIndex.value > 0) {
          currentIndex.value -= 1;
        }
      }

      //animation when user swiping
      translateX.value = withSpring(
        -currentIndex.value * (cardWidth + spacing),
        {
          damping: 50,
        }
      );
      console.log("currentIndex after swipe:", currentIndex.value);
    });

  //move the next card foward and current card out of screen
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.quantity}>{allRecipes.length} recipes</Text>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[animatedStyle, styles.foodList]}>
          {allRecipes.map(
            (item: {
              id: number;
              title: string;
              image: string;
              index: number;
              likes: number;
              readyInMinutes: number;
            }) => (
              <VerticalAnimatedFoodCard
                key={item.id}
                item={item}
                translateX={translateX}
              />
            )
          )}
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

  flatListContent: {
    gap: 0,
    padding: 0,
    alignItems: "center",
  },
});
