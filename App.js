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
import { useState } from "react";
import { useFonts } from "expo-font";

import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import AddScreen from "./screens/AddScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function BottomBar({navigation}) {
	const [search, setSearch] = useState("");

	function searchHandler(text) {
		console.log(search);
		setSearch(text);
	}
	return (
		<BottomTabs.Navigator
			screenOptions={({ navigation }) => ({
				tabBarStyle: {
					backgroundColor: Colors.white,
				},
				tabBarActiveTintColor: Colors.darkGreen,
			})}
		>
			<BottomTabs.Screen
				name='Home'
				component={HomeScreen}
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
									marginRight: 10,
									borderColor: Colors.darkGreen,
									borderWidth: 2,
									borderRadius: 20,
									paddingLeft: 3,
									width: 110,
								}}
							>
								<Ionicons
									name='search-outline'
									size={32}
									color={Colors.darkGreen}
								/>
								<TextInput
									style={{ borderRadius: 20, flex: 1, paddingRight: 6 }}
									underlineColorAndroid='transparent'
									onChangeText={searchHandler}
									value={search}
								/>
							</View>
						</View>
					),
					headerLeft: () => (
						<Ionicons
							name='ios-filter'
							size={35}
							color={Colors.darkGreen}
							style={{ paddingLeft: 8 }}
						
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
	);
}
export default function App() {
	const [fontsLoaded] = useFonts({
		"inter-regular": require("./assets/fonts/Inter-Regular.ttf"),
		"inter-bold": require("./assets/fonts/Inter-Bold.ttf"),
	});
	if (!fontsLoaded) {
		return <AppLoading />;
	}
	return (
		<View style={{ flex: 1 }}>
			<StatusBar barStyle='dark-content' hidden={false} translucent={true} />
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name='Homee'
						component={BottomBar}
						options={{ headerShown: false }}
					/>
					
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
}

const styles = StyleSheet.create({});
