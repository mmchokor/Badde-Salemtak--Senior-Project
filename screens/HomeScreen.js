import { StyleSheet, Text, View, Pressable } from "react-native";
import { Colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TravelerScreen from "./TravelerScreen";
import ResidentScreen from "./ResidentScreen";

const Stack = createNativeStackNavigator();

function HomeScreen() {
	// const navigation = useNavigation();

	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator screenOptions={{ animation: 'none' }}>
				<Stack.Screen
					name='Traveler'
					component={TravelerScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Resident'
					component={ResidentScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
export default HomeScreen;

const styles = StyleSheet.create({});
