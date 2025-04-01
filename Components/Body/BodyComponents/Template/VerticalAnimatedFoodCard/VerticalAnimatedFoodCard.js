import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import VerticalFoodCard from "./VerticalFoodCard";
import { useNavigation } from "@react-navigation/native";
//Separate the animated food card

//Set the width and space for each card
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const cardWidth = screenWidth * 0.69;
const spacing = 20;

export default function VerticalAnimatedFoodCard({ item, translateX }) {
  const navigation = useNavigation();

  //create animation for each card when swiping
  const cardAnimatedStyle = useAnimatedStyle(() => {
    //get the position for each card
    const cardPosition = translateX.value + item.index * (cardWidth + spacing);

    //if card position is not seen on the screen then hide it
    if (Math.abs(cardPosition) > screenWidth) {
      return { opacity: 0, height: screenHeight * 0.5 };
    }

    return {
      // reduce the card's opacity when swiping
      opacity: interpolate(cardPosition, [-cardWidth, 0, cardWidth], [0, 1, 1]),

      // reduce the card's height when swiping
      height: interpolate(
        cardPosition,
        [-cardWidth, 0, cardWidth],
        [100, screenHeight * 0.55, screenHeight * 0.5]
      ),
    };
  });

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Recipe", { item })}
      style={styles.cardContainer}
    >
      <Animated.View
        key={item.id}
        style={[{ width: cardWidth }, cardAnimatedStyle]}
      >
        <VerticalFoodCard
          name={item.title}
          imgUrl={item.image}
          likes={item.likes}
          aggregateLikes={item.aggregateLikes}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: spacing / 2,
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
