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

const BottomTabs = createBottomTabNavigator();

function BottomBar({ navigation }) {
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
				tabBarLabel: () => {
					return null;
				},
				tabBarActiveTintColor: Colors.darkGreen,
				tabBarHideOnKeyboard: true
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
									style={{
										borderRadius: 20,
										flex: 1,
										paddingRight: 6,
									}}
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
					headerShown:false
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
					headerLeft: () => (
						<Ionicons
							name='chevron-back-outline'
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
					headerTitle: "Profile",

					headerTitleAlign: "center",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='person' size={size} color={color} />
					),
					headerRight: () => <Text></Text>,
				}}
			/>
		</BottomTabs.Navigator>
	);
}

export default BottomBar;
