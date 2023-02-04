import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";

import AppLoading from "expo-app-loading";
import BottomBar from "./components/layouts/BottomBar";

const Stack = createNativeStackNavigator();

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
