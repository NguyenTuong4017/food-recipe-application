import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { fetchRecipe } from "../../../Fetch/fetch";

interface SortButtonsProps {
  OnFetchRecipe: (recipes: any[]) => void;
}

export default function SortButtons({ OnFetchRecipe }: SortButtonsProps) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [type, setType] = useState({
    type: "all",
    maxReadyTime: "500",
  });

  const [layers, setLayers] = useState([
    {
      id: 0,
      title: "All",
      width: 0,
      page: "AllRecipePage",
      section: "all",
      time: "500",
    },

    {
      id: 1,
      title: "Main Courses",
      width: 0,
      page: "MainCoursePage",
      section: "main%20course",
      time: "120",
    },

    {
      id: 2,
      title: "Breakfast",
      width: 0,
      page: "BreakfastPage",
      section: "side%20dish",
      time: "30",
    },

    {
      id: 3,
      title: "Lunch",
      width: 0,
      page: "LunchPage",
      section: "lunch",
      time: "60",
    },

    {
      id: 4,
      title: "Dinner",
      width: 0,
      page: "DinnerPage",
      section: "dinner",
      time: "200",
    },
  ]);

  //Get the recipes from API
  const handleFetch = (type: string, maxReadyTime: string) => {
    fetchRecipe(type, maxReadyTime)
      .then((data) => {
        const transformedData = data.results.map(
          (item: Object, index: number) => ({
            ...item,
            index: index,
          })
        );

        setAllRecipes(transformedData);
        OnFetchRecipe(transformedData);
      })
      .catch((error) => console.error("Fetching error: ", error));
  };

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

  //move to the section which is clicked by user
  const hanldePress = (section: string, time: string) => {
    setType({
      type: section,
      maxReadyTime: time,
    });
  };

  useEffect(() => {
    handleFetch(type.type, type.maxReadyTime);
  }, [type]);

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
            style={[
              type.type == button.section
                ? styles.clickedButton
                : styles.buttonContainer,
              { width: button.width },
            ]}
            onPress={() => hanldePress(button.section, button.time)}
          >
            <Text
              onLayout={(event) => {
                const textWidth = event.nativeEvent.layout.width;
                handleLayout(button.id, textWidth);
              }}
              style={[
                { fontWeight: "500" },
                type.type == button.section
                  ? { color: "#FFFFFF" }
                  : { color: "#000000" },
              ]}
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
    left: 10,
    borderRadius: 50,
    height: "70%",
  },
  clickedButton: {
    borderWidth: 1.2,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    left: 10,
    borderRadius: 50,
    height: "70%",
    backgroundColor: "#000000",
  },
});
