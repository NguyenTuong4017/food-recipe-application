import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SortButtons() {
  const [layers, setLayers] = useState([
    { id: 0, title: "All", width: 0, page: "AllRecipePage" },
    { id: 1, title: "Main Courses", width: 0, page: "MainCoursePage" },
    { id: 2, title: "Breakfast", width: 0, page: "BreakfastPage" },
    { id: 3, title: "Lunch", width: 0, page: "LunchPage" },
    { id: 4, title: "Dinner", width: 0, page: "DinnerPage" },
  ]);

  //A function to set the width of the navigate buttons dynamically based on its text
  const handleLayout = (id: number, textWidth: number) => {
    const newWidth = textWidth + 50;

    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === id && layer.width !== newWidth
          ? { ...layer, width: newWidth }
          : layer
      )
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {/* map function to show the navigate buttons */}
        {layers.map((button) => (
          <TouchableOpacity
            key={button.id}
            style={[styles.buttonContainer, { width: button.width }]}
          >
            <Text
              onLayout={(event) => {
                const textWidth = event.nativeEvent.layout.width;
                handleLayout(button.id, textWidth);
              }}
              style={{ fontWeight: "500" }}
            >
              {button.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "10%",
    //backgroundColor: "purple",
  },
  scrollContent: {
    alignItems: "center",
  },
  buttonContainer: {
    borderWidth: 1.2,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    borderRadius: 50,
    height: "70%",
  },
});
