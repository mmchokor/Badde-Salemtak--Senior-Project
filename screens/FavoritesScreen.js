import { StyleSheet, View, Dimensions } from "react-native";
import TravelerFavScreen from "./TravelerFavScreen";
import ResidentFavScreen from "./ResidentFavScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "../constants/colors";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { favorites, isFavScreenAtom } from "../store/Favorites/favorites";

const Tab = createMaterialTopTabNavigator();
function FavoritesScreen({ navigation, route }) {
  const [, setIsFavScreen] = useAtom(isFavScreenAtom);
  useFocusEffect(
    useCallback(() => {
      setIsFavScreen(true);
      return () => {
        setIsFavScreen(false);
      };
    }, [])
  );
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 15 },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.darkGreen,
          width: 80,
          left: (Dimensions.get("window").width / 2 - 80) / 2,
        },
        tabBarActiveTintColor: Colors.darkGreen, // add this line to set active tab color
      }}
    >
      <Tab.Screen name="Traveler"  component={TravelerFavScreen} />
      <Tab.Screen name="Resident" component={ResidentFavScreen} />
    </Tab.Navigator>
  );
}
export default FavoritesScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: 4, //15
  },
});
