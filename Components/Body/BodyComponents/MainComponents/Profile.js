import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import useCustomFonts from "../../../../JavaScriptFiles/Fonts";
import { auth, db } from "../../../../FirebaseConfig";
import FavoriteRecipeCard from "../SubComponents/Cards/FavoriteRecipeCard";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Profile({ navigation }) {
  const fontsLoaded = useCustomFonts();
  const [recipeList, setRecipeList] = useState([]);
  const user = auth.currentUser;

  //Get favorite recipes from firebase
  async function getFavoriteRecipes() {
    if (user) {
      const userId = user.uid; //user unique id
      const refList = collection(db, "users", userId, "favorites"); //reference to the favorites

      try {
        const querySnapshot = await getDocs(refList); // fetch all documents inside the favorites collection
        const favoriteList = querySnapshot.docs.map((doc) => ({
          docId: doc.id, //save the doc id
          ...doc.data(), // save all property inside the doc (title, image, recipeId,...)
        }));

        return favoriteList;
      } catch (error) {
        console.error("Error fetching favorites:", error);
        return []; //return an empty list if there is error
      }
    } else {
      console.log("User not logged in");
      return []; // if user is not logged in, return an empty list
    }
  }

  //fetch the favorite recipes when user navigate to the Profile
  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getFavoriteRecipes();
      setRecipeList(favorites);
    };

    fetchFavorites();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Avatar, Username and Email */}
      <View style={styles.informationContainer}>
        <Image
          source={require("../../../../assets/blank.png")}
          style={styles.avatar}
        />

        <View style={styles.textContainer}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Montserrat-SemiBold",
              marginLeft: 10,
            }}
          >
            {user.displayName}
          </Text>

          <Text
            style={{
              fontSize: 15,
              fontFamily: "Montserrat-Regular",
              marginLeft: 10,
            }}
          >
            {user.email}
          </Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("Edit")}
          >
            <Text style={{ fontSize: 15, fontFamily: "Montserrat-Medium" }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Favorite Recipes List */}
      <View style={styles.recipeContainer}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Montserrat-SemiBold",
            marginTop: 20,
            marginBottom: 15,
            marginLeft: 20,
          }}
        >
          Favorite Recipes
        </Text>

        {recipeList.map((recipe, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("Recipe", { id: recipe.recipeId })
              }
            >
              <FavoriteRecipeCard
                title={recipe.title}
                image={recipe.image}
                readyInMinutes={recipe.readyInMinutes}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //borderWidth: 1,
    flex: 1,
    backgroundColor: "#ffffff",
  },

  informationContainer: {
    //borderWidth: 1,
    height: 120,
    flexDirection: "row",
    alignItems: "flex-start",

    padding: 15,
  },

  avatar: {
    width: 95,
    height: 95,
    borderRadius: 100,
  },
  editButton: {
    height: 25,
    width: 60,
    //borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#d6d6d6",
    marginLeft: 8,
  },

  textContainer: {
    //borderWidth: 1,
    flex: 1,
    height: 90,
    justifyContent: "space-evenly",
    top: 15,
  },

  recipeContainer: {
    //borderWidth: 1,
  },
});
