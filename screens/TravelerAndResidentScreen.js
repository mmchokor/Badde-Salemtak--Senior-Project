import { StyleSheet, Dimensions} from "react-native";
import React from "react";
import TravelerScreen from "./TravelerScreen";
import ResidentScreen from "./ResidentScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomTapBar from "../components/UI/CustomTapBar";
import { Colors } from "../constants/colors";
const Tab = createMaterialTopTabNavigator();

const TravelerAndResidentScreen = ({navigation}) => {
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
      <Tab.Screen name="Traveler" component={TravelerScreen} options={{ tabBarLabel: 'Traveler' }} />
      <Tab.Screen name="Resident" component={ResidentScreen} options={{ tabBarLabel: 'Resident' }} />
    </Tab.Navigator>
  );
};

export default TravelerAndResidentScreen;

const styles = StyleSheet.create({});
