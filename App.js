import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Colors } from "./constants/colors";

import HomeTravelerScreen from "./screens/HomeTravelerScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import AddScreen from "./screens/AddScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function BottomBar() {
	return (
		<BottomTabs.Navigator
			screenOptions={({ navigation }) => ({
				headerStyle: { backgroundColor: Colors.white },
				headerTintColor: "white",
				tabBarStyle: { backgroundColor: Colors.white,paddingTop:4 },
				tabBarActiveTintColor: Colors.darkGreen,
			})}
		>
			<BottomTabs.Screen
				name='Home'
				component={HomeTravelerScreen}
				options={{
					title: "",
					
					tabBarIcon: ({ color }) => (
						<MaterialIcons  name='home' size={35} color={color} />
					),
					headerRight: () => (
						<Feather name='message-circle' size={35} color={Colors.darkGreen} />
					),
					headerLeft: () => (
						<Ionicons name='ios-filter' size={35} color={Colors.darkGreen} />
					),
				}}
			/>
			<BottomTabs.Screen
				name='Favorites'
				component={FavoritesScreen}
				options={{
					title: "",

					tabBarIcon: ({ color, size }) => (
						<Fontisto name='favorite' size={size} color={color} />
					),
				}}
			/>
			<BottomTabs.Screen
				name='Add'
				component={AddScreen}
				options={{
					title: "",

					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='add' size={40} color={color} />
					),
				}}
			/>
			<BottomTabs.Screen
				name='Notifications'
				component={NotificationsScreen}
				options={{
					title: "",

					tabBarIcon: ({ color, size }) => (
						<Ionicons name='notifications' size={size} color={color} />
					),
				}}
			/>
			<BottomTabs.Screen
				name='Profile'
				component={ProfileScreen}
				options={{
					title: "",

					tabBarIcon: ({ color, size }) => (
						<Ionicons name='person' size={size} color={color} />
					),
				}}
			/>
		</BottomTabs.Navigator>
	);
}
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Homee'
					component={BottomBar}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
