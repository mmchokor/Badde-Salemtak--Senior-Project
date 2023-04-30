import { StyleSheet, View, TextInput, Text } from "react-native";
import { Colors } from "../constants/colors";
import { Ionicons, Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import ItemDetailsScreen from "./ItemDetailsScreen";
import LocationDetailsScreen from "./LocationDetailsScreen";
import ChatScreen from "./ChatScreen";
import OfferReceived from "../components/Orders/OfferReceived";
import MakeOffer from "../components/Orders/MakeOffer";
import ProceedToPayment from "./ProceedToPayment";
import OrderConfirmation from "./OrderConfirmation";
import TravelerAndResidentScreen from "./TravelerAndResidentScreen";
import ProfileScreen from "./ProfileScreen";
import SearchScreen from "./SearchScreen";
import SearchScreenResident from "./SearchScreenResident";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { isTravScreenAtom } from "../store/TravResScreen/TravOrRes";
import { useAtom } from "jotai";
import PublicProfileScreenUser from "./PublicProfileScreenUser";
import HeaderHome from "../components/UI/HeaderHome";
import MyOrderScreen from './MyOrderScreen';
import AddItemAndLocationScreen from './AddItemAndLocationScreen';
const Stack = createNativeStackNavigator();
function HomeScreen({ route }) {
  // useEffect(() => {
  //   const load = route.params?.loading
  //   {load &&
  //     Toast.show({
  //       type: "success",
  //       text1: "Hello",
  //       text2: "This is some something 👋",
  //     })}
  // }, [])
  const navigation = useNavigation();
  const [isTravScreen] = useAtom(isTravScreenAtom);

  return (
    <Stack.Navigator screenOptions={{ animation: "none" }} id="test">
      <Stack.Screen
        name="TravelerorResident"
        component={TravelerAndResidentScreen}
        options={{
          //header: HeaderHome,
		  headerTitle: () =>  <HeaderHome />,
          headerShown: true,
          headerShadowVisible: false,
          //   headerRight: () => (
          //     <View style={{ flexDirection: "row-reverse" }}>
          //       <Feather
          //         name="message-circle"
          //         size={30}
          //         color={Colors.darkGreen}
          //       />
          //     </View>
          //   ),
          //   headerLeft: () => (
          //     <View style={{ flexDirection: "row" }}>
          //       <View
          //         style={{
          //           flexDirection: "row",
          //           //justifyContent: 'center',
          //           alignItems: "center",
          //           backgroundColor: "#F8F8FA",
          //           borderRadius: 10,
          //           borderWidth: 1,
          //           borderColor: "#C3C3C3",
          //           marginHorizontal: 25,
          //           //flex: 1,
          //           padding: 2,
          //         }}
          //       >
          //         <Ionicons
          //           name="search-outline"
          //           size={30}
          //           color={Colors.black}
          //           onPress={() => {
          //             if (isTravScreen) {
          //               navigation.navigate("SearchScreen");
          //             } else {
          //               navigation.navigate("SearchScreenResident");
          //             }
          //           }}
          //         />
          //         <Text>Search for an Item</Text>
          //       </View>
          //       <Feather
          //         name="message-circle"
          //         size={30}
          //         color={Colors.darkGreen}
          //       />
          //     </View>
          //   ),
        }}
      />

			<Stack.Screen
				name='ItemDetails'
				component={ItemDetailsScreen}
				options={{ headerShown: true }}
			/>
			<Stack.Screen
				name='LocationDetails'
				component={LocationDetailsScreen}
				options={{ headerShown: true }}
			/>
			<Stack.Screen
				name='chat'
				component={ChatScreen}
				options={({ route }) => ({
					headerShown: true,
					tapBarVisibility: false,
				})}
			/>
			<Stack.Screen
				name='Profile'
				component={ProfileScreen}
				options={{
					title: '',
					headerTitle: 'Profile',
					headerShown: true,
					headerShadowVisible: false,
					headerTitleStyle: { fontSize: 24, color: Colors.black },
					headerBackTitle: '',
					headerTintColor: Colors.darkGreen,
					headerTitleAlign: 'center',
					headerStyle: { backgroundColor: Colors.white },
				}}
			/>
			<Stack.Screen
				name='ProfileUser'
				component={PublicProfileScreenUser}
				options={{
					title: '',
					headerTitle: 'Profile',
					headerShown: true,
					headerShadowVisible: false,
					headerTitleStyle: { fontSize: 24, color: Colors.white },
					headerBackTitle: '',
					headerTintColor: Colors.darkGreen,
					headerTitleAlign: 'center',
					headerStyle: { backgroundColor: Colors.darkGreen },
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='person' size={size} color={color} />
					),
				}}
			/>
			<Stack.Screen
				name='offerRecieved'
				component={OfferReceived}
				options={({ route }) => ({
					headerShown: true,
					headerTransparent: false,
					title: 'Offer Received',
					headerTitleStyle: { fontSize: 24, color: Colors.black },
					headerBackTitle: '',
					headerTintColor: Colors.darkGreen,
					headerTitleAlign: 'center',
					headerStyle: { backgroundColor: Colors.grayBackground },
				})}
			/>
			<Stack.Screen
				name='makeOffer'
				component={MakeOffer}
				options={({ route }) => ({
					headerShown: true,
					headerShadowVisible: false,
					title: 'Your Offer',
					headerTitleStyle: { fontSize: 24, color: Colors.black },
					headerBackTitle: '',
					headerTintColor: Colors.darkGreen,
					headerTitleAlign: 'center',
					headerStyle: { backgroundColor: Colors.grayBackground },
				})}
			/>
			<Stack.Screen
				name='ProceedToPayment'
				component={ProceedToPayment}
				options={({ route }) => ({
					headerShown: true,
					headerShadowVisible: false,
					title: 'Payment',
					headerTitleStyle: { fontSize: 24, color: Colors.black },
					headerBackTitle: '',
					headerTintColor: Colors.darkGreen,
					headerTitleAlign: 'center',
					headerStyle: { backgroundColor: Colors.white },
				})}
			/>
			<Stack.Screen
				name='OrderConfirmation'
				component={OrderConfirmation}
				options={({ route }) => ({
					headerShown: true,
					headerShadowVisible: false,
					title: 'Order Confirmation',
					headerTitleStyle: { fontSize: 24, color: Colors.black },
					headerBackTitle: '',
					headerTintColor: Colors.darkGreen,
					headerTitleAlign: 'center',
					headerStyle: { backgroundColor: Colors.white },
				})}
			/>
			<Stack.Screen
				name='SearchScreen'
				component={SearchScreen}
				options={({ route }) => ({
					headerShown: true,
					headerShadowVisible: false,
					title: 'Search',
					headerTitleStyle: { fontSize: 24, color: Colors.black },
					headerBackTitle: '',
					headerTintColor: Colors.darkGreen,
					headerTitleAlign: 'center',
					headerStyle: { backgroundColor: Colors.white },
				})}
			/>
			<Stack.Screen
				name='SearchScreenResident'
				component={SearchScreenResident}
				options={({ route }) => ({
					headerShown: true,
					headerShadowVisible: false,
					title: 'Search',
					headerTitleStyle: { fontSize: 24, color: Colors.black },
					headerBackTitle: '',
					headerTintColor: Colors.darkGreen,
					headerTitleAlign: 'center',
					headerStyle: { backgroundColor: Colors.white },
				})}
			/>
			<Stack.Screen
				name='MyOrderScreen'
				component={MyOrderScreen}
				options={({ route }) => ({
					headerShown: true,
					headerShadowVisible: false,
					title: 'My Orders',
					headerTitleStyle: { fontSize: 24, color: Colors.black },
					headerBackTitle: '',
					headerTintColor: Colors.darkGreen,
					headerTitleAlign: 'center',
					headerStyle: { backgroundColor: Colors.white },

					headerLeft: () => (
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Ionicons
								name='arrow-back'
								size={35}
								color={Colors.darkGreen}
								style={{ marginRight: 10 }}
								onPress={() => navigation.goBack()}
							/>
						</View>
					),
				})}
			/>

			<Stack.Screen
				name='AddItemAndLocationScreen'
				component={AddItemAndLocationScreen}
				options={({ route }) => ({
					headerShown: false,
				})}
			/>
		</Stack.Navigator>
	);
}
export default HomeScreen;

const styles = StyleSheet.create({});
