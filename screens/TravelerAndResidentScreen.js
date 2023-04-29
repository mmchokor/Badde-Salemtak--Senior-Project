import { StyleSheet } from 'react-native';
import React from 'react';
import TravelerScreen from './TravelerScreen';
import ResidentScreen from './ResidentScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomTapBar from '../components/UI/CustomTapBar';
const Tab = createMaterialTopTabNavigator();

const TravelerAndResidentScreen = ({ navigation }) => {
	return (
		<Tab.Navigator
			tabBar={({ state }) => {
				return <CustomTapBar navigation={navigation} state={state} />;
			}}
		>
			<Tab.Screen name='Travelerr' component={TravelerScreen} />
			<Tab.Screen name='Residentt' component={ResidentScreen} />
		</Tab.Navigator>
	);
};

export default TravelerAndResidentScreen;

const styles = StyleSheet.create({});
