import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  TextInput,
} from "react-native";
import { Colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import TravelerScreen from "./TravelerScreen";
import ResidentScreen from "./ResidentScreen";
import ItemDetailsScreen from "./ItemDetailsScreen";
import LocationDetailsScreen from "./LocationDetailsScreen";
import ChatScreen from "./ChatScreen";
import OfferReceived from "../components/Orders/OfferReceived";
import MakeOffer from "../components/Orders/MakeOffer";
const Stack = createNativeStackNavigator();

function HomeScreen() {
  // const navigation = useNavigation();
  const [search, setSearch] = useState("");

  function searchHandler(text) {
    console.log(search);
    setSearch(text);
  }

  function getTabBarVisibility(route) {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "";
    //console.log(route.name)
    if (route.name === "chat") {
      return false;
    } else {
      return true;
    }
  }
  return (
    <NavigationContainer independent={true}>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ animation: "none" }}>
        <Stack.Screen
          name="Traveler"
          component={TravelerScreen}
          options={{
            title: "",

            headerShown: true,

            headerRight: () => (
              <View style={{ flexDirection: "row-reverse" }}>
                <Feather
                  name="message-circle"
                  size={35}
                  color={Colors.darkGreen}
                  //style={{ paddingRight: 5 }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: 10,
                    borderColor: Colors.darkGreen,
                    borderWidth: 2,
                    borderRadius: 20,
                    paddingLeft: 3,
                    width: 110,
                  }}
                >
                  <Ionicons
                    name="search-outline"
                    size={32}
                    color={Colors.darkGreen}
                  />
                  <TextInput
                    style={{
                      borderRadius: 20,
                      flex: 1,
                      paddingRight: 6,
                    }}
                    underlineColorAndroid="transparent"
                    onChangeText={searchHandler}
                    value={search}
                  />
                </View>
              </View>
            ),
            headerLeft: () => (
              <Ionicons name="ios-filter" size={35} color={Colors.darkGreen} />
            ),
          }}
        />
        <Stack.Screen
          name="Resident"
          component={ResidentScreen}
          options={{
            title: "",

            headerShown: true,

            headerRight: () => (
              <View style={{ flexDirection: "row-reverse" }}>
                <Feather
                  name="message-circle"
                  size={35}
                  color={Colors.darkGreen}
                  //style={{ paddingRight: 5 }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: 10,
                    borderColor: Colors.darkGreen,
                    borderWidth: 2,
                    borderRadius: 20,
                    paddingLeft: 3,
                    width: 110,
                  }}
                >
                  <Ionicons
                    name="search-outline"
                    size={32}
                    color={Colors.darkGreen}
                  />
                  <TextInput
                    style={{
                      borderRadius: 20,
                      flex: 1,
                      paddingRight: 6,
                    }}
                    underlineColorAndroid="transparent"
                    onChangeText={searchHandler}
                    value={search}
                  />
                </View>
              </View>
            ),
            headerLeft: () => (
              <Ionicons name="ios-filter" size={35} color={Colors.darkGreen} />
            ),
          }}
        />
        <Stack.Screen
          name="ItemDetails"
          component={ItemDetailsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="LocationDetails"
          component={LocationDetailsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="chat"
          component={ChatScreen}
          options={({ route }) => ({
            headerShown: true,
            tapBarVisibility: false,
          })}
        />
        <Stack.Screen
          name="offerRecieved"
          component={OfferReceived}
          options={({ route }) => ({
            headerShown: true,
            headerTransparent: false,
            title: "Offer Received",
            headerTitleStyle: { fontSize: 24, color: Colors.black},
            headerBackTitle: "",
            headerTintColor: Colors.darkGreen,
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: Colors.grayBackground}
          })}
        />
        <Stack.Screen
          name="makeOffer"
          component={MakeOffer}
          options={({ route }) => ({
            headerShown: true,
            headerShadowVisible: false,
            title: "Your Offer",
            headerTitleStyle: { fontSize: 24, color: Colors.black},
            headerBackTitle: "",
            headerTintColor: Colors.darkGreen,
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: Colors.grayBackground}
          })}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({});
