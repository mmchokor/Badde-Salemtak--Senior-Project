// Importing packages
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Colors } from "./constants/colors";
// Importing Screens
import BottomBar from "./components/layouts/BottomBar";
import LoginScreen from "./screens/LoginScreen";
import OTPScreen from "./screens/OTPScreen";
import SignupDetailsScreen from "./screens/SignUpDetailsScreen";
import SignupScreen from "./screens/SignupScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom } from "jotai";
import { authToken, isLoggedIn } from "./store/LoginStore/LoginStore";
// Creating a query client for React Query
const queryClient = new QueryClient();
// Creating a stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
	const [fontsLoaded] = useFonts({
		"inter-regular": require("./assets/fonts/Inter-Regular.ttf"),
		"inter-bold": require("./assets/fonts/Inter-Bold.ttf"),
		"inter-light": require("./assets/fonts/Inter-Light.ttf"),
		"inter-medium": require("./assets/fonts/Inter-Medium.ttf"),
	});
	const [LoggedIn, setIsLoggedIn] = useAtom(isLoggedIn);
	const [, setAuthToken] = useAtom(authToken);
	const [appIsLoading, setAppIsLoading] = useState(true);
	useEffect(() => {
		async function prepare() {
			SplashScreen.preventAutoHideAsync();
		}

		async function fetchToken() {
			const storedToken = await AsyncStorage.getItem('token')
			if (storedToken) {
				setIsLoggedIn(true)
				setAuthToken(storedToken)
			}

			setAppIsLoading(false)
		}
		
		fetchToken()
		prepare();
	}, []);

	if (!fontsLoaded || appIsLoading) {
		return undefined;
	} else {
		SplashScreen.hideAsync();
	}

	function LoginNavigator() {
		return (
			<NavigationContainer>
				<StatusBar style='light' />
				<Stack.Navigator>
					<Stack.Screen
						name='Login'
						component={LoginScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='signup'
						component={SignupScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='signupDetails'
						component={SignupDetailsScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='otpScreen'
						component={OTPScreen}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
	function MainAppNavigator() {
		return (
			<NavigationContainer>
				<StatusBar style='dark' />
				<Stack.Navigator>
					<Stack.Screen
						name='Homee'
						component={BottomBar}
						options={{ headerShown: false }}
					/>

          <Stack.Screen
            name="Fav"
            component={BottomBar}
            options={{ headerShown: true }}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
	  
    );
  }

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      {/* <StatusBar style="dark" /> */}
      <View style={{ flex: 1 }}>

      {LoggedIn ? <MainAppNavigator /> : <LoginNavigator />}
       {/* <MainAppNavigator /> */}
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});
