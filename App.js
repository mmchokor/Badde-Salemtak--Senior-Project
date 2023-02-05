import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useState, useEffect, useCallback } from "react";
import LoginScreen from './screens/LoginScreen'

import BottomBar from "./components/layouts/BottomBar";
import * as SplashScreen from "expo-splash-screen";
import FavoritesScreen from "./screens/FavoritesScreen";
const Stack = createNativeStackNavigator();

export default function App() {
	const [fontsLoaded] = useFonts({
		"inter-regular": require("./assets/fonts/Inter-Regular.ttf"),
		"inter-bold": require("./assets/fonts/Inter-Bold.ttf"),
	});
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			SplashScreen.preventAutoHideAsync();
		}
		prepare();
		}, []);

	if(!fontsLoaded){
		return undefined;
	}else{
		SplashScreen.hideAsync();
	}

	return (
		<View style={{ flex: 1 }} >
			<StatusBar barStyle='dark-content' hidden={false} translucent={true} />
			<NavigationContainer>
			<StatusBar style="light"/>
				<Stack.Navigator>
					{/* <Stack.Screen
						name='Homee'
						component={BottomBar}
						options={{ headerShown: false }}
					/> */}
				{/* <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
					<Stack.Screen
						name='Fav'
						component={BottomBar}
						options={{ headerShown: true }}
					/> */}
					<Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
}

const styles = StyleSheet.create({});
