import { Feather, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";

import AddScreen from "../../screens/AddScreen";
import FavoritesScreen from "../../screens/FavoritesScreen";
import HomeScreen from "../../screens/HomeScreen";
import NotificationsScreen from "../../screens/NotificationsScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import PublicProfileScreen from "../../screens/PublicProfileScreen";
import { SimpleLineIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import AddItemAndLocationScreen from "../../screens/AddItemAndLocationScreen";
import { Svg } from "react-native-svg";
import { SvgXml } from "react-native-svg";
import HomeIcon from "../../assets/Home-Icon.svg";

const BottomTabs = createBottomTabNavigator();

function BottomBar({ navigation }) {
  const [search, setSearch] = useState("");


  

 

 
  function searchHandler(text) {
    console.log(search);
    setSearch(text);
  }
  function setFavScreen() {
    console.log("Pressed nOw");
  }
  return (
    <BottomTabs.Navigator
      id="bottomTab"
      screenOptions={({ navigation }) => ({
        tabBarStyle: {
          backgroundColor: Colors.white,
        },
        tabBarLabel: () => {
          return null;
        },
        tabBarActiveTintColor: Colors.darkGreen,
        tabBarInactiveTintColor: Colors.bottomBarIcons,
        tabBarHideOnKeyboard: true,
      })}
    >
      <BottomTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "",

          tabBarIcon: ({ color }) => {
            //<MaterialIcons name="home" size={35} color={color} />
            //<SvgXml xml={homeIcon} />
            //<HomeIcon width={21} height={21} fill={color} />

            if (color === "#006A6B") {
              return <Ionicons name="home" size={24} color={color} />;
            } else {
              return <Ionicons name="home-outline" size={24} color={color} />;
            }
          },

          headerShown: false,
        }}
      />
      <BottomTabs.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favorites",
          headerShown: true,
          headerShadowVisible: false,
          title: "Favorites",
          headerTitleStyle: { fontSize: 24, color: Colors.black },
          headerBackTitle: "",
          headerTintColor: Colors.darkGreen,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.white },
          tabBarIcon: ({ color, size }) => {
            //<Fontisto name='favorite' size={size} color={color} />

            if (color === "#006A6B") {
              return <FontAwesome name="bookmark" size={24} color={color} />;
            } else {
              return <FontAwesome name="bookmark-o" size={24} color={color} />;
            }
          },
        }}
        onPress={setFavScreen}
      />
      <BottomTabs.Screen
        name="Add"
        component={AddItemAndLocationScreen}
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-add-circle" size={38} color={color} />
          ),
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={35}
              color={Colors.darkGreen}
              style={{ paddingLeft: 8 }}
            />
          ),
          headerRight: () => (
            <Text
              style={{
                fontSize: 20,
                color: Colors.darkGreen,
                fontFamily: "inter-bold",
                paddingRight: 10,
              }}
            >
              Done
            </Text>
          ),
        }}
      />
      <BottomTabs.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: "Notifications",
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: { fontSize: 24, color: Colors.black },
          headerBackTitle: "",
          headerTintColor: Colors.darkGreen,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.white },
          tabBarIcon: ({ color, size }) => {
            if (color === "#006A6B") {
              return <Ionicons name="notifications" size={24} color={color} />;
            } else {
              return (
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={color}
                />
              );
            }
          },
          headerTitleAlign: "center",
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={PublicProfileScreen}
        options={{
          title: "",
          headerTitle: "Profile",
          headerShown: false,
          headerShadowVisible: false,
          headerTitleStyle: { fontSize: 24, color: Colors.white },
          headerBackTitle: "",
          headerTintColor: Colors.darkGreen,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.darkGreen },
          tabBarIcon: ({ color, size }) => {
            if (color === "#006A6B") {
              return <Ionicons name="person" size={24} color={color} />;
            } else {
              return <Ionicons name="person-outline" size={24} color={color} />;
            }
          },
          //headerRight: () => {return (<SimpleLineIcons style={{marginRight: 10}} name="options-vertical" size={24} color={Colors.white} />)},
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default BottomBar;
