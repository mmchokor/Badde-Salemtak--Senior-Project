import React from 'react';
import AddItemScreen from './AddItemScreen';
import AddLocationScreen from './AddLocationScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from '../constants/colors';
const Tab = createMaterialTopTabNavigator();
import { StyleSheet, Dimensions, View, SafeAreaView } from 'react-native';

const AddItemAndLocationScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={{ flex: 1, paddingTop: 30,backgroundColor:Colors.white }}>
			<Tab.Navigator
				screenOptions={{
					tabBarLabelStyle: { fontSize: 18, textTransform: 'none', fontFamily: 'inter-regular' },
					tabBarIndicatorStyle: {
						backgroundColor: Colors.darkGreen,
						width: 80,
						left: (Dimensions.get('window').width / 2 - 80) / 2,
					},
					//tabBarActiveTintColor: Colors.darkGreen, // add this line to set active tab color
				}}
			>
				<Tab.Screen
					name='AddItemScreen'
					component={AddItemScreen}
					options={{ tabBarLabel: 'Add Item' }}
				/>
				<Tab.Screen
					name='AddLocationScreen'
					component={AddLocationScreen}
					options={{ tabBarLabel: 'Add Location' }}
				/>
			</Tab.Navigator>
		</SafeAreaView>
	);
};
export default AddItemAndLocationScreen;

const styles = StyleSheet.create({});
