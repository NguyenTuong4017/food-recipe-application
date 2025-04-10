import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { fetchRecipe } from "../../../../Fetch/fetch";
import useCustomFonts from "../../../../JavaScriptFiles/Fonts";

interface FilterButtonsProps {
  OnFetchRecipe: (recipes: any[]) => void;
  loadingTest: (loading: boolean) => void;
  resetSearch: () => void;
}

export default function FilterButtons({
  OnFetchRecipe,
  loadingTest,
  resetSearch,
}: FilterButtonsProps) {
  const [type, setType] = useState({
    type: "all",
    maxReadyTime: "500",
    number: "50",
  });

  const [filters, setFilters] = useState([
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
      title: "Main",
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
      time: "20",
    },

    {
      id: 3,
      title: "Lunch",
      width: 0,
      page: "LunchPage",
      section: "lunch",
      time: "30",
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
  const handleFetch = (type: string, maxReadyTime: string, number: string) => {
    fetchRecipe(type, maxReadyTime, number)
      .then((data) => {
        const transformedData = data.results.map(
          (item: Object, index: number) => ({
            ...item,
            index: index,
          })
        );

        //pass the data to body component
        OnFetchRecipe(transformedData);

        //set the loading status then pass to body component
        loadingTest(false);
      })
      .catch((error) => console.error("Fetching error: ", error));
  };

  //A function to set the width of the navigate buttons dynamically based on its text
  const handleLayout = (id: number, textWidth: number) => {
    const newWidth = textWidth + 55;

    setFilters((prevfilters) =>
      prevfilters.map((layer) =>
        layer.id === id && layer.width !== newWidth
          ? { ...layer, width: newWidth }
          : layer
      )
    );
  };

  const randomNum = () => {
    const randomNumber = Math.floor(Math.random() * (75 - 50 + 1)) + 50;
    return randomNumber.toString();
  };

  //move to the filter button which is clicked by user
  const hanldePress = (section: string, time: string) => {
    setType({
      type: section,
      maxReadyTime: time,
      number: randomNum(),
    });

    //set the loading status then pass to body component
    loadingTest(true);

    //reset the recipe gotten from search to empty
    resetSearch();
  };

  useEffect(() => {
    handleFetch(type.type, type.maxReadyTime, type.number);
  }, [type]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {/* map function to show the navigate buttons */}
        {filters.map((button) => (
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
                { fontFamily: "Montserrat-Medium" },
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
    height: "80%",
  },
  clickedButton: {
    borderWidth: 1.2,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    left: 10,
    borderRadius: 50,
    height: "80%",
    backgroundColor: "#000000",
  },
});
