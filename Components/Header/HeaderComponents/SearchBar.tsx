import { StyleSheet, Text, TextInput, View } from "react-native";
import GlassIcon from "../../../assets/icons/glassicon.svg";
import { useState } from "react";
import { fetchRecipeByIngredients } from "../../../Fetch/fetch";

interface SearchBarProps {
  passRecipeToHeader: (data: any) => void;
}

export default function SearchBar({ passRecipeToHeader }: SearchBarProps) {
  const [input, setInput] = useState<string>("");
  const [ingredientsString, setIngredientsString] = useState("");

  //start fetching after press enter button
  const handleSubmit = (event: { nativeEvent: { text: string } }) => {
    let ref = "";
    const ingredients = event.nativeEvent.text
      .split(",")
      .map((word) => word.trim());

    if (ingredients.length == 1) {
      ref = ingredients[0];
      setIngredientsString(ref);
    } else {
      ref = ingredients.join("%2C%20");
      setIngredientsString(ref);
    }
    //reset the value of search bar text to ""
    setInput("");
    fetchRecipeByIngredients(ref).then((data) => passRecipeToHeader(data));
  };

  return (
    // glass icon and TextInput
    <View style={styles.container}>
      <GlassIcon style={styles.icon} height={"50%"} />
      <TextInput
        style={styles.input}
        placeholder="Search Ingredients"
        selectionColor={"#898989"}
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={(event) => handleSubmit(event)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "40%",
    //backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 35,
    bottom: 10,
  },
  input: {
    width: "77%",
    height: "50%",
    //backgroundColor: "green",
    borderBottomWidth: 1,
    fontSize: 15,
  },

  icon: {
    borderBottomWidth: 1,
    //backgroundColor: "blue",
  },
});
