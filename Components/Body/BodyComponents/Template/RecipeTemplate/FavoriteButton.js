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
        <Heart width={25} height={25} />
      ) : (
        <HeartFill width={25} height={25} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    //borderWidth: 1,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 5,
    backgroundColor: "#F5F5F5",
  },
});
