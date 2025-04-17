import { TouchableOpacity, StyleSheet } from "react-native";
import Heart from "../../../../../../assets/icons/heart.svg";
import HeartFill from "../../../../../../assets/icons/heartfill.svg";
import { useState, useEffect } from "react";
import { db } from "../../../../../../FirebaseConfig";
import { auth } from "../../../../../../FirebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";

export default function FavoriteButton({ recipeInfo }) {
  const [isClicked, setClicked] = useState(false);

  const handleClick = async () => {
    setClicked(!isClicked);

    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const favoriteList = collection(db, "user", userId, "favorite");

      try {
        const q = query(favoriteList, where("recipeId", "==", recipeInfo.id));
        const queryResult = await getDocs(q);

        if (!queryResult.empty) {
          const docId = queryResult.docs[0].id;
          await deleteDoc(doc(favoriteList, docId));
          console.log("Recipe remove");
        } else {
          await addDoc(favoriteList, {
            recipeId: recipeInfo.id,
            title: recipeInfo.title,
            image: recipeInfo.image,
            readyInMinutes: recipeInfo.readyInMinutes,
            timeStamp: new Date(),
          });
          console.log("Recipe added to Favorite list");
        }
      } catch (error) {
        console.log("Error at adding recipe to favorite list: ", error);
      }
    } else {
      console.log("User not logged in");
    }
  };

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const favoritesRef = collection(db, "user", userId, "favorite");
        const q = query(favoritesRef, where("recipeId", "==", recipeInfo.id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setClicked(true);
        } else {
          setClicked(false);
        }
      }
    };

    checkIfFavorite();
  }, [recipeInfo]);

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
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 5,
    backgroundColor: "#F5F5F5",
    marginRight: 10,
  },
});
