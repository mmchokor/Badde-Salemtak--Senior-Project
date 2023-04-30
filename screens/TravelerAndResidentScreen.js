import { StyleSheet, Dimensions, View, Text} from "react-native";
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
      // tabBar={({ state }) => {
      //   return <CustomTapBar navigation={navigation} state={state} />;
      // }}
      screenOptions={{
        tabBarLabelStyle: { fontSize: 20, textTransform: 'none', fontFamily: 'inter-regular' },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.darkGreen,
          width: 80,
          left: (Dimensions.get("window").width / 2 - 80) / 2, 
        },
        //tabBarStyle: {paddingTop: 30}
      }}
      
    >
      <Tab.Screen name="Travelerr" component={TravelerScreen} options={{ tabBarLabel: 'Traveler' }} />
      <Tab.Screen name="Residentt" component={ResidentScreen} options={{ tabBarLabel: 'Resident' }} />
    </Tab.Navigator>
  );
};

export default TravelerAndResidentScreen;

const styles = StyleSheet.create({});
