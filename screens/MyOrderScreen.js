import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import { Colors } from '../constants/colors';
import { useState } from 'react';

function MyOrderScreen() {
	const [selectedButton, setSelectedButton] = useState('Requested');

	const handleButtonPress = (buttonName) => {
		setSelectedButton(buttonName);
	};
	const data = [
		{ key: '1', name: 'Item 1' },
		{ key: '2', name: 'Item 2' },
		{ key: '3', name: 'Item 3' },
		{ key: '4', name: 'Item 4' },
		{ key: '5', name: 'Item 5' },
	];
	const renderItem = ({ item }) => (
		<TouchableOpacity>
			<View style={styles.item}>
				<View style={styles.listInnerContainer}>
					<View style={styles.head}>
						<Text style={styles.listHead}>Iphone 12</Text>
					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginHorizontal: 25,
						}}
					>
						<Text style={styles.subHead}>Assigned</Text>
						<Text style={styles.subHead}>Delivery Date</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginHorizontal: 20,
						}}
					>
						<Text style={styles.subSubHead}>Rami Sakakni</Text>
						<Text style={styles.subSubHead}>June 12,2023</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
	return (
		<View style={[styles.container, { backgroundColor: Colors.white }]}>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={[
						styles.button,
						selectedButton === 'Requested' && styles.selectedButton,
					]}
					onPress={() => handleButtonPress('Requested')}
				>
					<Text
						style={[
							styles.textN,
							selectedButton === 'Requested' && styles.selectedText,
						]}
					>
						Requested
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.button,
						selectedButton === 'In Transit' && styles.selectedButton,
					]}
					onPress={() => handleButtonPress('In Transit')}
				>
					<Text
						style={[
							styles.textN,
							selectedButton === 'In Transit' && styles.selectedText,
						]}
					>
						In Transit
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.button,
						selectedButton === 'Received' && styles.selectedButton,
					]}
					onPress={() => handleButtonPress('Received')}
				>
					<Text
						style={[
							styles.textN,
							selectedButton === 'Received' && styles.selectedText,
						]}
					>
						Received
					</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.key}
			/>
		</View>
	);
}

export default MyOrderScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 6,
		paddingTop: 8,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: 25,
	},
	button: {
		backgroundColor: Colors.white,
		padding: 9,
		paddingHorizontal: 18,
		borderRadius: 16,
		borderWidth: 0.6,
		borderColor: Colors.darkGreen,
	},
	textN: {
		fontFamily: 'inter-regular',
		color: Colors.black,
	},
	selectedButton: {
		backgroundColor: Colors.darkGreen,
	},
	selectedText: {
		color: Colors.white,
		fontFamily: 'inter-regular',
	},
	item: {
		borderWidth: 0.6,
		marginVertical: 3,
		borderColor: Colors.darkGreen,
		borderRadius: 12,
		width: '100%',
	},
	listHead: {
		fontFamily: 'inter-bold',
		fontSize: 16,
	},
	listInnerContainer: {
		marginHorizontal: 10,
		marginVertical: 15,
	},
	subHead: {
		fontFamily: 'inter-regular',
		fontSize: 12,
		color: Colors.gray,
	},
	subSubHead: {
		fontFamily: 'inter-bold',
		fontSize: 15,
		color: Colors.darkGreen,
	},
	head: {
		margin: 10,
	},
});
