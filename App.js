// Importing packages
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Colors } from './constants/colors'
// Importing Screens
import BottomBar from './components/layouts/BottomBar'
import FavoritesScreen from './screens/FavoritesScreen'
import LoginScreen from './screens/LoginScreen'
import OTPScreen from './screens/OTPScreen'
import SignupDetailsScreen from './screens/SignUpDetailsScreen'
import SignupScreen from './screens/SignupScreen'

// Creating a query client for React Query
const queryClient = new QueryClient()
// Creating a stack navigator
const Stack = createNativeStackNavigator()

export default function App() {
   const [fontsLoaded] = useFonts({
      'inter-regular': require('./assets/fonts/Inter-Regular.ttf'),
      'inter-bold': require('./assets/fonts/Inter-Bold.ttf'),
      'inter-light': require('./assets/fonts/Inter-Light.ttf'),
      'inter-medium': require('./assets/fonts/Inter-Medium.ttf'),
   })

   useEffect(() => {
      async function prepare() {
         SplashScreen.preventAutoHideAsync()
      }
      prepare()
   }, [])

   if (!fontsLoaded) {
      return undefined
   } else {
      SplashScreen.hideAsync()
   }

   return (
      <QueryClientProvider client={queryClient}>
         <View style={{ flex: 1 }}>
            <StatusBar style='dark' hidden={false} translucent={true} />
            {/* <StatusBar animated={true} style="auto"  /> */}
            <NavigationContainer>
               <StatusBar style='light' />
               <Stack.Navigator>
                  <Stack.Screen
                     name='Login'
                     component={LoginScreen}
                     options={{ headerShown: false }}
                  />
                  <Stack.Screen
                     name='Homee'
                     component={BottomBar}
                     options={{ headerShown: false }}
                  />

                  <Stack.Screen
                     name='Fav'
                     component={BottomBar}
                     options={{ headerShown: true }}
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
         </View>
      </QueryClientProvider>
   )
}

const styles = StyleSheet.create({})
