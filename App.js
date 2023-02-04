import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
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
		<View style={{ flexDirection: "row", flex: 1 }}>
			<BottomTabs.Navigator
				screenOptions={({ navigation }) => ({
					headerStyle: { backgroundColor: Colors.white },
					headerTintColor: "black",
					tabBarStyle: {
						backgroundColor: Colors.white,
						height: 48,
						flexDirection: "row",
						justifyContent: "center",
					},
					tabBarActiveTintColor: Colors.darkGreen,
				})}
			>
				<BottomTabs.Screen
					name='Home'
					component={HomeTravelerScreen}
					options={{
						title: "",

						tabBarIcon: ({ color }) => (
							<MaterialIcons name='home' size={35} color={color} />
						),
						headerRight: () => (
							<View style={{ flexDirection: "row-reverse" }}>
								<Feather
									name='message-circle'
									size={35}
									color={Colors.darkGreen}
									style={{ paddingRight: 5 }}
								/>
								<View
									style={{
										flexDirection: "row",
										marginRight: 15,
										borderColor: Colors.darkGreen,
										borderWidth: 2,
										borderRadius: 20,
										paddingLeft: 18,
										paddingRight:3,
									}}
								>
									<TextInput style={{backgroundColor:Colors.grayBackground,}} inlineImageLeft='search_icon' />
									<Ionicons name='search-outline' size={32} color={Colors.darkGreen} />
								</View>
							</View>
						),
						headerLeft: () => (
							<Ionicons
								name='ios-filter'
								size={35}
								color={Colors.darkGreen}
								style={{ paddingLeft: 5 }}
							/>
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
							<Ionicons name='ios-add-circle' size={35} color={color} />
						),
					}}
				/>
				<BottomTabs.Screen
					name='Notifications'
					component={NotificationsScreen}
					options={{
						title: "",

						tabBarIcon: ({ color, size }) => (
							<Ionicons name='notifications' size={30} color={color} />
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
		</View>
	);
}
export default function App() {
	return (
		<>
			<StatusBar style='dark' />
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name='Homee'
						component={BottomBar}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
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
