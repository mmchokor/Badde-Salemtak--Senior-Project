import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddItemScreen from "./AddItemScreen";
import AddLocationScreen from "./AddLocationScreen";
const Stack = createNativeStackNavigator();
function AddScreen() {
	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator screenOptions={{ animation: "none" }}>
				<Stack.Screen
					name='Item'
					component={AddItemScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Location'
					component={AddLocationScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
export default AddScreen;

const styles = StyleSheet.create({});
