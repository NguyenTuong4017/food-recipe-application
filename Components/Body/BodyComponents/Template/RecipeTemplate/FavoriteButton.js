import { TouchableOpacity, StyleSheet } from "react-native";
import Heart from "../../../../../assets/icons/heart.svg";
import HeartFill from "../../../../../assets/icons/heartfill.svg";
import { useState } from "react";

export default function FavoriteButton() {
  const [isClicked, setClicked] = useState(false);

  const handleClick = () => {
    isClicked == true ? setClicked(false) : setClicked(true);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      {isClicked == false ? (
        <Heart width={20} height={20} />
      ) : (
        <HeartFill width={20} height={20} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    //borderWidth: 1,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 5,
    backgroundColor: "#F5F5F5",
  },
});
