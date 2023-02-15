import { StyleSheet, Text, View, Pressable, StatusBar,TextInput } from "react-native";
import { Colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import {Ionicons,Feather,} from '@expo/vector-icons'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {useState} from 'react';
import TravelerScreen from "./TravelerScreen";
import ResidentScreen from "./ResidentScreen";
import ItemDetailsScreen from "./ItemDetailsScreen";
const Stack = createNativeStackNavigator();

function HomeScreen() {
	// const navigation = useNavigation();
	const [search, setSearch] = useState("");

	function searchHandler(text) {
		console.log(search);
		setSearch(text);
	}
	return (
		<NavigationContainer independent={true} >
			<StatusBar style='dark'  />
			<Stack.Navigator screenOptions={{ animation: 'none' }}>
				<Stack.Screen
					name='Traveler'
				
					component={TravelerScreen}
					options={{ title: '',
						
						headerShown: true 
					
					,
					headerRight: () => (
						<View style={{ flexDirection: "row-reverse" }}>
							<Feather
								name='message-circle'
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
							
						/>
					),
					}}
				/>
				<Stack.Screen
					name='Resident'
					component={ResidentScreen}
					options={{ title: '',
						
						headerShown: true 
					
					,
					headerRight: () => (
						<View style={{ flexDirection: "row-reverse" }}>
							<Feather
								name='message-circle'
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
							
						/>
					),
					}}
				/>
				<Stack.Screen
					name='ItemDetails'
					component={ItemDetailsScreen}
					options={{ headerShown: true}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
		// <View>
		// 	<TravelerScreen/>
		// 	<ResidentScreen/>
		// 	<ItemDetailsScreen/>
		// </View>
	);
}
export default HomeScreen;

const styles = StyleSheet.create({});
